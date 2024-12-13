import { useMutation, useQueryClient } from "@tanstack/react-query";
import { styleGuidesApi } from "./api";
import { StyleGuide, StyleGuideMap } from "@/lib/types";
import { setDefaultStyleGuideAction } from "./set-default-style-guide-action";

export const useStyleGuideMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (selectedGuides: StyleGuideMap) => {
      const selectedIds = Object.values(selectedGuides)
        .filter((guide): guide is StyleGuide => guide !== null)
        .map(guide => guide.id);

      if (selectedIds.length === 0) {
        throw new Error("Please select at least one style guide");
      }

      const results = await Promise.all(
        selectedIds.map(async (id) => {
          const result = await setDefaultStyleGuideAction(id);
          if (!result.success) {
            throw new Error(result.response);
          }
          return result;
        })
      );

      return results.every(r => r.success);
    },

    onMutate: async (selectedGuides) => {
      await queryClient.cancelQueries({ 
        queryKey: [styleGuidesApi.baseKey] 
      });

      const previousGuides = queryClient.getQueryData<StyleGuide[]>([styleGuidesApi.baseKey]);

      if (previousGuides) {
        const updatedGuides = previousGuides.map(guide => ({
          ...guide,
          isActive: selectedGuides[guide.codelang_code]?.id === guide.id
        }));

        queryClient.setQueryData([styleGuidesApi.baseKey], updatedGuides);
      }

      return { previousGuides };
    },

    onError: (error, variables, context) => {
      if (context?.previousGuides) {
        queryClient.setQueryData(
          [styleGuidesApi.baseKey],
          context.previousGuides
        );
      }
      throw error;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ 
        queryKey: [styleGuidesApi.baseKey] 
      });
    }
  });

  return {
    saveGuides: mutation.mutateAsync,
    loading: mutation.isPending,
    isError: mutation.isError
  };
};