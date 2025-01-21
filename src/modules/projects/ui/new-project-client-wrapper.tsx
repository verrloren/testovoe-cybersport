"use client";

import { UploadProjects } from "@/components/upload-projects";
// import { FileList } from "@/components/file-list";

import { ProjectCreateForm } from "@/modules/projects/ui/project-create-form";
import { useState } from "react";

export function NewProjectClientWrapper() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <main
      className="w-full min-h-screen relative flex flex-col justify-center items-center md:flex-row gap-y-8
 xl:gap-x-12 2xl:gap-x-20 md:gap-x-8 overflow-x-hidden mt-12 sm:mt-24 md:mt-0"
    >
      {/* FORM */}
      <div className="w-full md:w-1/2 relative ">
        <ProjectCreateForm files={files} />
      </div>
      {/* UPLOAD */}
      <div className="w-full md:w-1/2 h-full flex flex-row items-center justify-center relative">
        <UploadProjects onFilesUpdate={setFiles} />
      </div>
    </main>
  );
}
