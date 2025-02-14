"use client";

import { useState } from "react";
import { UploadProjects, ProjectCreateForm } from "@/features/projects";
import { PageContainer } from "@/shared";

export function NewProjectClientWrapper() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <PageContainer className="flex-center-col md:flex-row gap-y-8 xl:gap-x-12 2xl:gap-x-20 md:gap-x-8">
			
      <div className="w-full h-full flex-center-col md:flex-row gap-8 mt-16 md:mt-0 pb-12 md:pb-0 ">
				{/* UPLOAD */}
				<div className="w-full h-full md:w-1/2 flex-center relative">
					<UploadProjects onFilesUpdate={setFiles} />
				</div>
				{/* FORM */}
				<div className="w-full md:w-1/2 relative">
					<ProjectCreateForm files={files} />
				</div>
			</div>
    </PageContainer>
  );
}
