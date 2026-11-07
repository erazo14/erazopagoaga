import { z } from 'zod';
import ENV from '@/environment';

const rsvpStatusSchema = z.enum(['pending', 'attending', 'declined']);

const invitationSchema = z.object({
  guestId: z.string(),
  principal: z.object({
    name: z.string(),
    salutation: z.string().optional(),
  }),
  invitationType: z.string(),
  maxGuests: z.number().int().positive(),
  rsvp: z.object({
    status: rsvpStatusSchema,
    guestCount: z.number().int().nonnegative(),
    attendeeNames: z.array(z.string()),
    note: z.string().optional(),
    respondedAt: z.string().optional(),
  }),
});

const rsvpResponseSchema = z.object({
  status: z.enum(['attending', 'declined']),
  guestCount: z.number().int().nonnegative(),
  attendeeNames: z.array(z.string()),
  respondedAt: z.string(),
});

export type Invitation = z.infer<typeof invitationSchema>;
export type RsvpStatus = 'attending' | 'declined';
export type SubmitRsvpInput = {
  status: RsvpStatus;
  guestCount: number;
  note?: string;
  attendeeNames?: string[];
};
export type SubmittedRsvp = z.infer<typeof rsvpResponseSchema>;

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

function apiUrl(path: string): string {
  if (!ENV.apiBaseUrl) {
    throw new ApiRequestError('VITE_API_BASE_URL is not configured', 0);
  }
  return `${ENV.apiBaseUrl}/api${path}`;
}

async function readResponse(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function throwApiError(response: Response): Promise<never> {
  const body = await readResponse(response);
  const message =
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof body.error === 'string'
      ? body.error
      : `Request failed with status ${response.status}`;
  throw new ApiRequestError(message, response.status);
}

export async function getInvitation(
  guestId: string,
  signal?: AbortSignal,
): Promise<Invitation> {
  const response = await fetch(
    apiUrl(`/invites/${encodeURIComponent(guestId)}`),
    { signal },
  );
  if (!response.ok) {
    return throwApiError(response);
  }

  const parsed = invitationSchema.safeParse(await readResponse(response));
  if (!parsed.success) {
    throw new ApiRequestError('The invitation response has an unexpected format', 502);
  }
  return parsed.data;
}

export async function submitInvitationRsvp(
  guestId: string,
  input: SubmitRsvpInput,
): Promise<SubmittedRsvp> {
  const response = await fetch(
    apiUrl(`/rsvps/${encodeURIComponent(guestId)}`),
    {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(input),
    },
  );
  if (!response.ok) {
    return throwApiError(response);
  }

  const parsed = rsvpResponseSchema.safeParse(await readResponse(response));
  if (!parsed.success) {
    throw new ApiRequestError('The RSVP response has an unexpected format', 502);
  }
  return parsed.data;
}
