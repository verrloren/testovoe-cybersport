
import Container from "@/shared/ui/container";
import { getStyleGuidesAction } from "@/features/styleguides/get-style-guides-action";
import { getQueryClient } from "@/shared/api/get-query-clients";
import { NewProjectClientWrapper } from "@/features/projects/ui/new-project-client-wrapper";
import { styleGuidesApi } from "@/features/styleguides/api/api";

export default async function NewProjectPage() {
	
  const queryClient = getQueryClient();
	
		if (!queryClient.getQueryData([styleGuidesApi.baseKey])) {
			await queryClient.prefetchQuery({
				queryKey: [styleGuidesApi.baseKey],
				queryFn: getStyleGuidesAction,
			});
		}

  return (
    <Container>
			<NewProjectClientWrapper />
    </Container>
  );
}
