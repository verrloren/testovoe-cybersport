"use client";

import { CodeBlock } from "react-code-block";
import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { StatusIndicator } from "./ui/status-indicator";
import { themes } from "prism-react-renderer";
import { useProjectStore } from "@/store/useProjectStore";

export function ProjectsTable() {
  const { selectedProject } = useProjectStore(); // ✅ Use zustand store

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="w-full min-h-80"
    >
      <Tabs defaultValue="codeReview" className="w-full pb-8 text-white">
        <div className="w-full min-h-96 bg-black rounded-3xl border border-neutral-800">
          <TabsList className=" text-base border-b pl-4 py-6 border-neutral-800 w-full justify-start">

            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins text-base 
							hover:text-neutral-400"
              value="codeReview"
            >
              Code review
            </TabsTrigger>
						<TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins text-base pl-4
							hover:text-neutral-400"
              value="overview"
            >
              Overview
            </TabsTrigger>
          </TabsList>



          <TabsContent
            className="text-neutral-300 font-ibmPlexMono  my-8 w-full"
            value="overview"
          >
            {selectedProject?.code_reviews?.map(
              (
                review // ✅ Add optional chaining
              ) => (
                <div key={review.id} className="flex items-center px-8">
                  <h3 className=" font-ibmPlexMono text-neutral-600 text-lg">
                    {review.project_review}
                  </h3>
                </div>
              )
            )}
            {(!selectedProject?.code_reviews ||
              selectedProject?.code_reviews.length === 0) && ( 
              <div className="flex items-center gap-x-2">
                <h3 className="ml-8 font-poppins text-neutral-200 text-xl">
                  No reviews available
                </h3>
              </div>
            )}
          </TabsContent>




          <TabsContent
            className="text-neutral-300 font-ibmPlexMono  my-4 w-full"
            value="codeReview"
          >
            {selectedProject?.code_reviews?.map((review) => (
              <div key={review.id} className="space-y-8">
                {review.issues?.map((issue) => (
                  <div
                    key={issue.id}
                    className="mb-8 bg-black/50 rounded-xl p-6"
                  >
                    {/* File info */}
                    <div className="flex items-center gap-4 mb-6 text-sm ">
                      <h5 className="text-2xl text-white">
                        {issue.type_of_issue}
                      </h5>
                      <p className="text-sm font-ibmPlexMono text-neutral-600">
                        at {issue.file_path}
                      </p>
                      <p className="text-sm font-ibmPlexMono text-neutral-600">
                        on Line {issue.line_number}
                      </p>
                    </div>

                    {/* Code snippet */}
                    {issue.line_snippet && (
                      <div className="mb-6 bg-red-900/40 p-4 rounded-lg">
                        <h4 className="text-neutral-200 mb-2 text-sm font-medium">
                          Error
                        </h4>
                        <CodeBlock
                          theme={themes.duotoneDark}
                          code={issue.line_snippet}
                          language="typescript"
                        >
                          <CodeBlock.Code
                            className="w-full bg-black text-wrap  p-6 rounded-xl shadow-lg"
                            style={{
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
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
                      </div>
                    )}

                    {/* Issue and suggestions */}
                    <div className="space-y-6">
                      <div className="bg-red-900/40 p-4 rounded-lg">
                        <h4 className="text-neutral-200 mb-2 text-sm font-medium">
                          Issue
                        </h4>
                        <p className="text-neutral-400">
                          {typeof issue.issue_body === "string"
                            ? issue.issue_body
                            : JSON.stringify(issue.issue_body)}
                        </p>
                      </div>

                      {issue.suggestions && (
                        <div className="bg-green-900/40 p-4 rounded-lg">
                          <h4 className="text-neutral-200 mb-2 text-sm font-medium">
                            Suggestion
                          </h4>
                          <p className="text-neutral-400">
                            {issue.suggestions}
                          </p>
                        </div>
                      )}

                      {issue.suggested_code && (
                        <div className="bg-green-900/40 p-4 rounded-lg">
                          <h4 className="text-neutral-200 mb-2 text-sm font-medium">
                            Suggested Code
                          </h4>

                          <CodeBlock
                            theme={themes.duotoneDark}
                            code={issue.suggested_code}
                            language="typescript"
                          >
                            <CodeBlock.Code
                              className="w-full bg-black text-wrap  p-6 rounded-xl shadow-lg"
                              style={{
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
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
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}

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
