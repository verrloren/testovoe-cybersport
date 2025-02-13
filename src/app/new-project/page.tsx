
import Container from "@/shared/ui/container";
import { styleGuidesApi } from "@/modules/styleguides/api";
import { getStyleGuidesAction } from "@/features/styleguides/get-style-guides-action";
import { NewProjectClientWrapper } from "@/modules/projects/ui/new-project-client-wrapper";
import { getQueryClient } from "@/shared/get-query-clients";

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
