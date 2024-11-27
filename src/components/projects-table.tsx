"use client";

import { CopyBlock, irBlack } from "react-code-blocks";
import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProjectsTable() {
  const logs = [
    {
      id: "1",
      status: "error",
      code: ` ⨯ ReferenceError: code is not defined
			at ProjectsTable (C:\Users\danil\Desktop\CODE\Next\hackathon-evrz\.next\server\chunks\ssr\[root of the server]__25cdd5._.js:958:35) digest: "3436924529"`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="w-full min-h-80"
    >
      <Tabs defaultValue="account" className="w-full text-white">
        {/* <div className=" h-full w-auto ml-2 font-poppins text-2xl"> */}
        {/* <TabsList>
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white"
              value="logs"
            >
              Logs
            </TabsTrigger>
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white"
              value="warnings"
            >
              Warnings
            </TabsTrigger>
          </TabsList> */}
        {/* </div> */}

        <div className="w-full min-h-20 bg-black rounded-3xl border border-neutral-600">
          <TabsList className=" border-b border-neutral-600 w-full justify-start">
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins"
              value="logs"
            >
              Logs
            </TabsTrigger>
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins"
              value="errors	"
            >
              Errors
            </TabsTrigger>
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins"
              value="warnings"
            >
              Warnings
            </TabsTrigger>
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins"
              value="codeReview"
            >
              Code review
            </TabsTrigger>
            <TabsTrigger
              className="text-neutral-600 data-[state=active]:text-white font-poppins"
              value="recommendations"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent
            className="text-neutral-300 font-ibmPlexMono mx-4"
            value="logs"
          >
            {logs.map((log) => (
              <div key={log.id} className="w-full h-full text-wrap">
                <CopyBlock
                  text={log.code}
                  language="typescript"
                  showLineNumbers={true}
                  theme={irBlack}
                />
              </div>
            ))}
          </TabsContent>
          <TabsContent
            className="text-neutral-500 font-ibmPlexMono mx-4"
            value="warnings"
          >
            Change your password here.
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}
