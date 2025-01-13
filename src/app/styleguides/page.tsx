"use server";
import Container from "@/components/container";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/get-query-clients";
import { getStyleGuidesAction } from "@/modules/styleguides/get-style-guides-action";
import { Button } from "@/components/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { StyleGuidesList } from "@/modules/styleguides/ui/style-guides-list";
import { styleGuidesApi } from "@/modules/styleguides/api";

export default async function StyleGuidesPage() {
  const queryClient = getQueryClient();

  // if (!queryClient.getQueryData([projectsApi.baseKey])) {
  //   await queryClient.prefetchQuery({
  //     queryKey: [projectsApi.baseKey],
  //     queryFn: getProjectsAction,
  //   });
  // }

  if (!queryClient.getQueryData([styleGuidesApi.baseKey])) {
    await queryClient.prefetchQuery({
      queryKey: [styleGuidesApi.baseKey],
      queryFn: getStyleGuidesAction,
    });
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
          <div className="w-full pt-20 md:pt-44 lg:pt-52 2xl:pt-72">
            <div className="flex items-center justify-between">
              <h3 className="text-8xl text-white font-semibold pb-8 xl:pb-16">
                Style Guides
              </h3>
              <Link
                href="/new-project"
              >
                <Button
                  className="w-auto px-4 h-12 py-2 bg-neutral-100 hover:bg-white rounded-xl
							hover:border-white shadow-none transition-colors text-neutral-950 text-base"
                >
                  <AiOutlinePlus className="text-black" />
                    Create style guide
                </Button>
              </Link>
            </div>
            <div
              className="w-full relative flex flex-col justify-center
							gap-y-6 md:gap-y-16 xl:gap-y-20 pb-20"
            >
							<StyleGuidesList />
            </div>
          </div>
        </HydrationBoundary>
      </Container>
    </main>
  );
}
