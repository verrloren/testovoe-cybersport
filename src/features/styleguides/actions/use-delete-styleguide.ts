import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { StyleGuide } from "@/entities/styleguide";
import { styleGuidesApi, deleteStyleGuideAction } from "@/features/styleguides";

export const useDeleteStyleGuideMutation = () => {

	const queryClient = useQueryClient();

	const deleteStyleGuideMutation = useMutation({
		mutationFn: (id: number) => deleteStyleGuideAction(id),
		onMutate: async styleGuideId => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({
				queryKey: [styleGuidesApi.baseKey],
			});
			 // Snapshot the previous value
			const previousStyleGuides = queryClient.getQueryData<StyleGuide[]>([styleGuidesApi.baseKey]);
			// Optimistically update to the new value
			if(previousStyleGuides){
				queryClient.setQueryData<StyleGuide[]>([styleGuidesApi.baseKey], 
					old => old ? old.filter(styleguide => styleguide.id !== styleGuideId) : []
				)
				toast.success("Style Guide deleted successfully");
			}

			return { previousStyleGuides, styleGuideId };
		},
    onError: (error, styleGuideID, context) => {
      if (context?.previousStyleGuides) {
        queryClient.setQueryData(
          [styleGuidesApi.baseKey],
          context.previousStyleGuides
        );
      }
    },

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [styleGuidesApi.baseKey] })
		}
	});

	const deleteStyleGuide = async (id: number) => {
		const result = await deleteStyleGuideMutation.mutateAsync(id);
		if (!result?.success) {
      throw new Error(result?.response || 'Failed to delete style guide.');
    }
    return result;
	};

	return { deleteStyleGuide, error: deleteStyleGuideMutation.error };
}