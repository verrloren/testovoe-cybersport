"use server";
import { ActionButtons } from "@/modules/projects/ui/action-buttons";
import Container from "@/components/container";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/get-query-clients";
import {  StyleGuide } from "@/shared/model/types";
import { styleGuidesApi } from "@/modules/styleguides/api";
import { StyleGuideName } from "@/modules/styleguides/ui/style-guide-name";
import { getStyleGuidesAction } from "@/modules/styleguides/get-style-guides-action";

interface StyleGuidePageProps {
  params: {
    styleGuidesId: string;
  }
}

export default async function StyleGuidePage({ params }: StyleGuidePageProps ) {
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


    if (!styleguide) {
      return <div className="text-white text-center mt-52 text-2xl">Style Guide not found</div>;
    }
		


  	const dehydratedState = dehydrate(queryClient);

  return (
    <main className="min-h-screen w-full bg-transparent relative overflow-x-hidden">
      {/* sphere */}
      {/* <div
        className="radial-ellipse-dashboard w-full aspect-square
        fixed right-0 -top-[20%] sm:-top-1/4 md:-top-1/4 lg:-top-[40%]
        xl:-top-[60%] "
      /> */}
      <Container>
        <HydrationBoundary state={dehydratedState}>
          <div
            className="w-full relative pt-44 md:pt-52 lg:pt-60 2xl:pt-72 flex flex-col justify-center 
						gap-y-6 md:gap-y-16 xl:gap-y-20"
          >
            <div className="w-full flex flex-col md:flex-row gap-y-16 items-center justify-center md:justify-between">

							<StyleGuideName styleGuideName={styleguide.name} />
              <ActionButtons bg="black" rounded="full" redirect={true} />
            </div>

          </div>
        </HydrationBoundary>
      </Container>
    </main>
  );
}

