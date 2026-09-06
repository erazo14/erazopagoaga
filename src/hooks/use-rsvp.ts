// import {
//   getGetRsvpSummaryQueryKey,
//   getListRsvpsQueryKey,
//   useCreateRsvp,
// } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';

export function useSubmitRsvp() {
  const queryClient = useQueryClient();
  // const mutation = useCreateRsvp();

  // const submit = (data: Parameters<typeof mutation.mutate>[0]['data'], onSuccess?: () => void) => {
  //   mutation.mutate(
  //     { data },
  //     {
  //       onSuccess: () => {
  //         // void queryClient.invalidateQueries({ queryKey: getListRsvpsQueryKey() });
  //         // void queryClient.invalidateQueries({ queryKey: getGetRsvpSummaryQueryKey() });
  //         onSuccess?.();
  //       },
  //     },
  //   );
  // };

  // return { ...mutation, submit };
}