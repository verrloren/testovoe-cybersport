'use server';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { getStyleGuides } from "@/modules/projects/getStyleGuides";
// import { Project } from "@/lib/types";
import { ProjectsTable } from "@/modules/projects/components/projects-table";
import { getProjectsAction } from "@/modules/projects/get-projects-action";
import { ActionButtons } from "@/modules/projects/components/action-buttons";
import Container from "@/components/container";
import { ProjectsCombobox } from "@/modules/projects/components/projects-combobox";
import { projectsApi, styleGuidesApi } from "@/modules/projects/api";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/get-query-clients";
import { getStyleGuidesAction } from "@/modules/projects/get-style-guides-action";


export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [projectsApi.baseKey],
    queryFn: getProjectsAction,
  });

  await queryClient.prefetchQuery({
    queryKey: [styleGuidesApi.baseKey],
    queryFn: getStyleGuidesAction,
  });

	const dehydratedState = dehydrate(queryClient);

  return (
    <main className="min-h-screen w-full bg-transparent relative overflow-x-hidden">
      {/* sphere */}
      <div
        className="radial-ellipse-dashboard w-full aspect-square
        fixed right-0 -top-[20%] sm:-top-1/4 md:-top-1/4 lg:-top-[40%]
        xl:-top-[60%] "
      />
      <Container>
					<HydrationBoundary state={dehydratedState}>
						<div
							className="w-full relative pt-44 md:pt-52 lg:pt-60 2xl:pt-72 flex flex-col justify-center 
											gap-y-6 md:gap-y-16 xl:gap-y-20"
						>
							<div className="w-full flex flex-col md:flex-row gap-y-16 items-center justify-center md:justify-between">
											<ProjectsCombobox />
											<ActionButtons />
							</div>
							<div className="h-full w-full">
								<ProjectsTable />
							</div>
						</div>
					</HydrationBoundary>
      </Container>
    </main>
  );
}

// import Container from "@/components/container";
// import { ProjectsData } from "@/modules/auth/components/projects-data";
// import { Spin } from "antd";
// import { Suspense } from "react";
// import { LoadingOutlined } from '@ant-design/icons';


// export default function HomePage() {
//   return (
//     <main className="min-h-screen w-full bg-transparent relative overflow-x-hidden">
//       <div className="radial-ellipse-dashboard w-full aspect-square fixed right-0 -top-[20%] sm:-top-1/4 md:-top-1/4 lg:-top-[40%] xl:-top-[60%]" />
//       <Container>
//           <ProjectsData />
//       </Container>
//     </main>
//   );
// }

// explain me this error and help me fix it: 
// Error: Server Functions cannot be called during initial render. This would create a fetch waterfall. Try to use a Server Component to pass data to Client Components instead.
//     at Object.fetchFn [as fn] (D:\CODE\NEXT\evrz-query-zustand\.next\server\chunks\ssr\node_modules_c2bac3._.js:15911:20) 
//     at run (D:\CODE\NEXT\evrz-query-zustand\.next\server\chunks\ssr\node_modules_c2bac3._.js:15523:55)
//     at Object.start (D:\CODE\NEXT\evrz-query-zustand\.next\server\chunks\ssr\node_modules_c2bac3._.js:15564:17)
//     at Query.fetch (D:\CODE\NEXT\evrz-query-zustand\.next\server\chunks\ssr\node_modules_c2bac3._.js:15987:30)
//     at QueryObserver.fetchOptimistic (D:\CODE\NEXT\evrz-query-zustand\.next\server\chunks\ssr\node_modules_aefa0d._.js:1191:22)
//     at fetchOptimistic (D:\CODE\NEXT\evrz-query-zustand\.next\server\chunks\ssr\node_modules_aefa0d._.js:1651:82)
//     at useBaseQuery (D:\CODE\NEXT\evrz-query-zustand\.next\server\chunks\ssr\node_modules_aefa0d._.js:1758:210)
//     at useSuspenseQuery (D:\CODE\NEXT\evrz-query-zustand\.next\server\chunks\ssr\node_modules_aefa0d._.js:1806:208)       
//     at ProjectsCombobox (D:\CODE\NEXT\evrz-query-zustand\.next\server\chunks\ssr\src_7fb7c6._.js:2945:252)
// digest: "809947452"
//  GET / 500 in 16974ms