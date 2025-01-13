import { useMutation, useQueryClient } from "@tanstack/react-query";
import { styleGuidesApi } from "./api";
import {  StyleGuide } from "@/shared/model/types";
import { sendStyleGuideAction } from "./send-style-guide-action";

interface UploadVariables {
  file: File;
  codelang_code: string;
}
interface MutationContext {
  previousStyleGuides: StyleGuide[] | undefined;
}

export const useSendStyleGuide = () => {

	const queryClient = useQueryClient();

  const uploadMutation = useMutation<StyleGuide, Error, UploadVariables, MutationContext>({
    mutationFn: async ({ file, codelang_code }) => {
      const formData = new FormData();
      formData.append('codelang_code', codelang_code);
      formData.append(
        'subject',
        file.name.substring(0, file.name.lastIndexOf('.')) || file.name
      );
      formData.append('file', file);

      const result = await sendStyleGuideAction(formData);

      if (!result.success) {
        throw new Error(result.response);
      }

      // Return the new style guide data
      return result.response as StyleGuide;
    },
    onMutate: async ({ file, codelang_code }): Promise<MutationContext> => {

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [styleGuidesApi.baseKey] });

      // Snapshot the previous value
      const previousStyleGuides = queryClient.getQueryData<StyleGuide[]>([styleGuidesApi.baseKey]);

      // Optimistically update to the new value
      if (previousStyleGuides) {
        const newStyleGuide: StyleGuide = {
          id: Date.now(), // Temporary ID
          name: file.name.substring(0, file.name.lastIndexOf('.')) || file.name,
          codelang_code: codelang_code,
          isActive: false,
					text: '',
					user_guidelines: [],
          // Add other required fields with default values
        };
        queryClient.setQueryData<StyleGuide[]>([styleGuidesApi.baseKey], [
          ...previousStyleGuides,
          newStyleGuide,
        ]);
      }

      // Return context containing previous data
      return { previousStyleGuides };
    },
    onError: (err, file, context) => {
      // Roll back cache to previous value
      if (context?.previousStyleGuides) {
        queryClient.setQueryData<StyleGuide[]>([styleGuidesApi.baseKey], context.previousStyleGuides);
      }
    },
    onSuccess: (data) => {
      // Optionally replace the temporary guide with the one from the server
      queryClient.setQueryData<StyleGuide[]>([styleGuidesApi.baseKey], (old) => {
        if (!old) return [data];
        return old.map((guide) => (guide.id === data.id ? data : guide));
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [styleGuidesApi.baseKey] });
    },
  });
	return { uploadMutation };

}