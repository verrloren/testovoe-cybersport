"use client";

import JSZip from 'jszip';
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
	Loader,
	Button, 
	CreateProjectFormData,
	createProjectSchema,
	CustomInput
} from "@/shared";
import { 
	createProjectAction, 
	useProjectStatus, 
	useProcessingProjectsStore
} from "@/features/projects";
import { getStyleGuidesAction, styleGuidesApi } from "@/features/styleguides";
import { StyleGuide } from '@/entities';



export function ProjectCreateForm({ files }: { files: File[] }) {

	const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectId, setProjectId] = useState<number>(0);

	const { data: statusData } = useProjectStatus(projectId);
  const addProcessingProject = useProcessingProjectsStore(state => state.addProcessingProject);

  const { data: styleguides = [], isLoading } = useQuery<StyleGuide[]>({
    queryKey: [styleGuidesApi.baseKey],
    queryFn: getStyleGuidesAction,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
  });




  const onSubmit = async (data: CreateProjectFormData) => {
    if (files.length === 0) {
      toast.error("Please upload at least one file");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Append form data
      formData.append("projectName", data.projectName);
      formData.append("styleGuide", data.styleGuide);
      
      const hasZipFile = files.some((file) => file.type === "application/zip");

      if (hasZipFile) {
        // Append all files directly if any ZIP file is present
        files.forEach((file) => {
          formData.append("files", file);
        });
      } else {
        // Create a ZIP for non-ZIP files
        const zip = new JSZip();
        files.forEach((file) => {
          zip.file(file.name, file);
        });

        const zipBlob = await zip.generateAsync({ type: "blob" });
        formData.append("files", new File([zipBlob], "archive.zip", { type: "application/zip" }));
      }

      for(const [keys, values] of formData) {
        console.log("formData before fetch:", keys,values)
      }
      const res = await createProjectAction(formData);

			console.log(res)

      if(res?.success || res?.response){
				setProjectId(Number(res?.response));
				addProcessingProject(Number(res?.response));
				router.push('/projects');
			}
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to create project");
      setIsSubmitting(false);
    }
  };





  if (isLoading) return <Loader loading={isLoading} />;

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, delay: .2,  ease: "easeInOut" }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col items-start gap-y-4 xl:gap-y-6"
    >
      <h5 className="text-3xl font-bold text-center text-white">
        Project name
      </h5>
      <CustomInput
  			variant="outline"
        placeholder="What will it be?"
        {...register("projectName")}
      />
      {errors.projectName && (
        <p className="text-red-500 text-sm">{errors.projectName.message}</p>
      )}
      <h5 className="text-3xl font-bold text-center text-white">Style Guide</h5>
      <Controller
        name="styleGuide"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className="w-full py-6 text-neutral-400 placeholder:text-neutral-600 hover:text-neutral-400
              transition-colors bg-black rounded-2xl font-poppins text-sm
              font-light z-40 
              border border-neutral-800 hover:border-neutral-400
              ring-0 focus:border-neutral-400 focus:outline-none "
            >
              <SelectValue
                className="text-neutral-400 placeholder:text-neutral-600"
                placeholder="Select Style Guide"
              />
            </SelectTrigger>

            <SelectContent className="w-full bg-black border border-neutral-800 rounded-2xl">
              {styleguides.map((styleguide) => (
                <SelectItem
                  key={styleguide.id}
                  value={styleguide.id.toString()}
                  className="text-neutral-400 placeholder:text-neutral-600 cursor-pointer hover:text-neutral-200 
                  transition-colors font-poppins text-sm font-light"
                >
                  {styleguide.name}
                </SelectItem>
              ))}
              <Link href="/new-styleguide">
                <Button className="bg-transparent ml-4 text-neutral-300">
                  Create new Style Guide
                </Button>
              </Link>
            </SelectContent>
          </Select>
        )}
      />
      {errors.styleGuide && (
        <p className="text-red-500 text-sm">{errors.styleGuide.message}</p>
      )}
      <Button
				className='w-full h-12 mt-4'
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
					statusData?.response.project_status === 'pending' ? "Uploading..." :
          statusData?.response.project_status === 'processing' ? "Processing..." :
          "Creating..."
        ) : "Submit"}
      </Button>
    </motion.form>
  );
}
