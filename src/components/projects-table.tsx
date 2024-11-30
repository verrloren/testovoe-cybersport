"use client";

import { CodeBlock } from "react-code-block";
import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusIndicator } from "./ui/status-indicator";
import { themes } from 'prism-react-renderer';
import { useEffect, useState } from "react";
import { Project } from "@/lib/types";

interface ProjectsTableProps {
	projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {

	const [selectedProject, setSelectedProject] = useState(projects[0]);
	

	useEffect(() => {
    const handleProjectSelected = (event: CustomEvent) => {
      setSelectedProject(event.detail)
    };

    document.addEventListener("projectSelected", handleProjectSelected as EventListener);

		return () => {
      document.removeEventListener("projectSelected", handleProjectSelected as unknown as EventListener);
		};
	}, [])

	if (!selectedProject) {
		return <div className="text-neutral-300 font-ibmPlexMono my-8 w-full">Select a project to view logs.</div>;
	}


  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="w-full min-h-80"
    >
      <Tabs defaultValue="overview" className="w-full pb-8 text-white">

        <div className="w-full min-h-96 bg-black rounded-3xl border border-neutral-800">
          <TabsList className=" text-base border-b pl-4 py-6 border-neutral-800 w-full justify-start">
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins text-base 
							hover:text-neutral-400"
              value="overview"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins text-base 
							hover:text-neutral-400"
              value="codeReview"
            >
              Code review
            </TabsTrigger>
          </TabsList>



          <TabsContent
            className="text-neutral-300 font-ibmPlexMono  my-8 w-full"
            value="overview"
          >
					{selectedProject.code_reviews?.map((review) => ( // ✅ Add optional chaining
            <div key={review.id} className="flex items-center gap-x-2">
              <h3 className="ml-8 font-poppins text-neutral-200 text-xl">
                {review.project_review}
              </h3>
            </div>
          ))}
          {(!selectedProject.code_reviews || selectedProject.code_reviews.length === 0) && ( // ✅ Handle empty state
            <div className="flex items-center gap-x-2">
              <h3 className="ml-8 font-poppins text-neutral-200 text-xl">
                No reviews available
              </h3>
            </div>
          )}
          </TabsContent>

					

          <TabsContent
            className="text-neutral-300 font-ibmPlexMono  my-8 w-full"
            value="codeReview"
          >
						<h1>jo</h1>
						{/* <ol className="w-full flex flex-col gap-y-8">
              {selectedProject.code_reviews.map((review) => (
                <li key={review.id}>
                  <div className="flex items-center gap-x-2">
                    <h3 className="ml-8 font-poppins text-neutral-200 text-xl">
                      {review.header}
                    </h3>
                    <StatusIndicator size="sm" status={review.status} />
                  </div>
                  <CodeBlock
                    theme={themes.github}
                    code={review.code}
                    language="javascript"
                  >
                    <CodeBlock.Code 
										className="w-full bg-black text-wrap  p-6 rounded-xl shadow-lg"
										style={{
											whiteSpace: 'pre-wrap',
											wordBreak: 'break-word',
											overflowWrap: 'break-word',
										}}
										>
                      <div className="table-row ">
                        <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                        <CodeBlock.LineContent className="table-cell text-wrap flex-wrap ">
                          <CodeBlock.Token />
                        </CodeBlock.LineContent>
                      </div>
                    </CodeBlock.Code>
                  </CodeBlock>
                </li>
              ))}
            </ol> */}
          </TabsContent>




        </div>
      </Tabs>
    </motion.div>
  );
}
