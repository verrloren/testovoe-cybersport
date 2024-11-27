"use client";

import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectsTableProps {}

export function ProjectsTable({}: ProjectsTableProps) {
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



        <div className="w-full min-h-80 bg-black rounded-3xl border border-neutral-600">

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

          <TabsContent className="text-neutral-300 font-ibmPlexMono mx-4" value="logs">
            Make changes to your account here.
          </TabsContent>
          <TabsContent className="text-neutral-500 font-ibmPlexMono mx-4" value="warnings">
            Change your password here.
          </TabsContent>

        </div>
      </Tabs>
    </motion.div>
  );
}
