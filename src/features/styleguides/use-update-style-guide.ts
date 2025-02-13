import { useMutation, useQueryClient } from "@tanstack/react-query";
import { styleGuidesApi } from "./api";
import {  StyleGuide } from "@/shared/model/types";
import { editStyleGuideAction } from "./edit-style-guide-action";

export const useUpdateStyleGuide = () => {

	const queryClient = useQueryClient();
	type UpdateStyleGuideVariables = {
		id: number;
		name: string;
	}
	

	const updateStyleGuideMutation = useMutation({
		mutationFn: ({ id, name }: UpdateStyleGuideVariables) => editStyleGuideAction(id, name),
    
    onMutate: async ({ id, name }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [styleGuidesApi.baseKey],
      });

      // Snapshot previous styleguide
      const previousStyleGuides = queryClient.getQueryData<StyleGuide[]>([styleGuidesApi.baseKey]);

      // Optimistically update styleguide list
      if (previousStyleGuides) {
        const updatedStyleGuides = previousStyleGuides.map(styleguide => 
          styleguide.id === id ? { ...styleguide, name } : styleguide
        );
        queryClient.setQueryData([styleGuidesApi.baseKey], updatedStyleGuides);
      }

      // Update local state

      return { previousStyleGuides };
    },
		onError: (_, __, context) => {
			// Roll back to the previous value
				if (context?.previousStyleGuides) {
					queryClient.setQueryData([styleGuidesApi.baseKey], context.previousStyleGuides)
				}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [styleGuidesApi.baseKey] })
		}
	});

	const updateStyleGuide = (id: number, name: string) => {
		updateStyleGuideMutation.mutate({ id, name });
	};

	return { updateStyleGuide };
}