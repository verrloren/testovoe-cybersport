"use server";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { StyleGuide } from "@/entities";
import { Container, getQueryClient, PageContainer } from "@/shared";
import { ActionButtons } from "@/features/projects";
import { styleGuidesApi, getStyleGuidesAction, StyleGuideName } from "@/features/styleguides";


export default async function StyleGuidePage({ params }: { params: { styleGuidesId: string}} ) {
	
	const queryClient = getQueryClient();
  const styleGuideId = parseInt(params.styleGuidesId);

	
  if (!queryClient.getQueryData([styleGuidesApi.baseKey])) {
    await queryClient.prefetchQuery({
      queryKey: [styleGuidesApi.baseKey],
      queryFn: getStyleGuidesAction,
    });
  }

	const styleguides = queryClient.getQueryData<StyleGuide[]>([styleGuidesApi.baseKey]);
  const styleguide = styleguides?.find(styleguide => styleguide.id === styleGuideId);

  if (!styleguide) return <div className="text-white text-center mt-52 text-2xl">Style Guide not found</div>

  const dehydratedState = dehydrate(queryClient);

  return (
    <PageContainer>
      <Container>
        <HydrationBoundary state={dehydratedState}>
          <div className="w-full relative flex-center-col pt-44 md:pt-52 lg:pt-60 2xl:pt-72 gap-y-6 md:gap-y-16 xl:gap-y-20">

            <div className="w-full flex-center-col md:flex-row md:justify-between gap-y-16">
							<StyleGuideName styleGuideName={styleguide.name} />
              <ActionButtons bg="black" rounded="full" redirect={true} />
            </div>

          </div>
        </HydrationBoundary>
      </Container>
    </PageContainer>
  );
}

