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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="w-full min-h-80"
    >
      <Tabs defaultValue="logs" className="w-full pb-8 text-white">

        <div className="w-full min-h-96 bg-black rounded-3xl border border-neutral-600">
          <TabsList className=" text-base border-b pl-4 py-6 border-neutral-600 w-full justify-start">
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins text-base"
              value="logs"
            >
              Logs
            </TabsTrigger>

            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins text-base"
              value="codeReview"
            >
              Code review
            </TabsTrigger>
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins text-base"
              value="recommendations"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>



          <TabsContent
            className="text-neutral-300 font-ibmPlexMono  my-8 w-full"
            value="logs"
          >
						<ol className="w-full flex flex-col gap-y-8">
              {selectedProject.logs.map((log) => (
                <li key={log.id}>
                  <div className="flex items-center gap-x-2">
                    <h3 className="ml-8 font-poppins text-neutral-200 text-xl">
                      {log.header}
                    </h3>
                    <StatusIndicator size="sm" status={log.status} />
                  </div>
                  <CodeBlock
                    theme={themes.duotoneDark}
                    code={log.code}
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
            </ol>
          </TabsContent>


          <TabsContent
            className="text-neutral-500 font-ibmPlexMono mx-8 mt-8 mb-12 "
            value="codeReview"
          >
            {selectedProject.codeReview}
          </TabsContent>
          <TabsContent
            className="text-neutral-500 font-ibmPlexMono mx-8 mt-8 mb-12 "
            value="recommendations"
          >
            {selectedProject.recommendations}
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}
