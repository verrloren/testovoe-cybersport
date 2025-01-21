
import Container from "@/components/container";
import { styleGuidesApi } from "@/modules/styleguides/api";
import { getStyleGuidesAction } from "@/modules/styleguides/get-style-guides-action";
import { getQueryClient } from "@/shared/get-query-clients";

export default async function NewStyleGuidePage() {
	
  const queryClient = getQueryClient();
		if (!queryClient.getQueryData([styleGuidesApi.baseKey])) {
			await queryClient.prefetchQuery({
				queryKey: [styleGuidesApi.baseKey],
				queryFn: getStyleGuidesAction,
			});
		}

  return (
    <Container>
			New style guide
    </Container>
  );
}
