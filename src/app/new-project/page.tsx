
import { getQueryClient, Container } from "@/shared";
import { NewProjectClientWrapper } from "@/features/projects";
import { styleGuidesApi, getStyleGuidesAction } from "@/features/styleguides";

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
