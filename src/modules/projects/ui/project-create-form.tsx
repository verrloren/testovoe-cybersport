"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { projectsApi } from "../api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CreateProjectFormData, createProjectSchema } from "@/shared/schemas";
import { StyleGuide } from "@/shared/model/types";
import { styleGuidesApi } from "@/modules/styleguides/api";
import { getStyleGuidesAction } from "@/modules/styleguides/get-style-guides-action";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../../components/loader";
import { motion } from "framer-motion";
import Link from "next/link";

export function ProjectCreateForm({ files }: { files: File[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const createProjectMutation = useMutation({
    mutationFn: projectsApi.createProject,
    onSuccess: () => {
      toast.success("Project created successfully!");
      // Optional: Reset form here
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project");
    },
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

      // Append files
      files.forEach((file) => {
        formData.append("files", file);
      });

      console.log(data);

      await createProjectMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
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
      <Input
        {...register("projectName")}
        placeholder="What will it be?"
        name="projectName"
        className="w-full py-6 text-neutral-400
		transition-colors bg-black rounded-2xl font-poppins
		font-light z-40 border border-neutral-800 hover:border-neutral-400 placeholder:text-neutral-400 focus:border-neutral-400"
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
        className="py-6 mt-4 w-full text-xl bg-white text-black font-poppins rounded-2xl z-40 
				transition-colors hover:bg-white disabled:opacity-50"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Submit"}
      </Button>
    </motion.form>
  );
}
