"use client";

import { UploadProjects } from "@/features/projects/ui/upload-projects";
// import { FileList } from "@/components/file-list";

import { useState } from "react";
import { ProjectCreateForm } from "./project-create-form";

export function NewProjectClientWrapper() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <main
      className="w-full min-h-screen relative flex flex-col justify-center items-center md:flex-row gap-y-8
 xl:gap-x-12 2xl:gap-x-20 md:gap-x-8 overflow-x-hidden"
    >
      <div className="w-full h-full mt-20 md:mt-0 pb-12 md:pb-0
			flex flex-col md:flex-row items-center justify-center gap-8">
				{/* UPLOAD */}
				<div className="w-full md:w-1/2 h-full flex flex-row items-center justify-center relative">
					<UploadProjects onFilesUpdate={setFiles} />
				</div>
				{/* FORM */}
				<div className="w-full md:w-1/2 relative ">
					<ProjectCreateForm files={files} />
				</div>
			</div>
    </main>
  );
}
