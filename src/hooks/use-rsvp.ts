import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getInvitation,
  submitInvitationRsvp,
  type Invitation,
  type SubmitRsvpInput,
} from '@/lib/rsvp-api';

const invitationQueryKey = (guestId: string) =>
  ['public-invitation', guestId] as const;

export function useInvitation(guestId?: string) {
  return useQuery({
    queryKey: invitationQueryKey(guestId ?? ''),
    queryFn: ({ signal }) => getInvitation(guestId!, signal),
    enabled: Boolean(guestId),
    retry: false,
    staleTime: 15_000,
  });
}

export function useSubmitRsvp(guestId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SubmitRsvpInput) =>
      submitInvitationRsvp(guestId, input),
    onSuccess: (response, input) => {
      queryClient.setQueryData<Invitation>(
        invitationQueryKey(guestId),
        (current) =>
          current
            ? {
                ...current,
                rsvp: {
                  ...response,
                  note: input.note,
                },
              }
            : current,
      );
    },
  });
}