"use client";

import { Button } from "@/components/ui/button";
import { AiOutlineEdit } from "react-icons/ai";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Input } from "../../../components/ui/input";
import toast from "react-hot-toast";
import { useProjectsStore } from "@/modules/projects/projects-store";
import { useUpdateProject } from "../use-update-project";


export function SheetEdit() {


	const { selectedProject} = useProjectsStore();
	const { updateProject } = useUpdateProject();
	

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
    const formData = new FormData(form);
    const newName = formData.get('projectName') as string;

    if (!selectedProject || !newName) {
      toast.error('Please enter a name');
      return;
    }

    try {
			await updateProject(selectedProject.id, newName);
			toast.success('Project name updated successfully');
			document.getElementById('dialog-close-button')?.click();
			form.reset();
		} catch (error) {
			toast.error(`Failed to update name: ${error}`);
		}
  };

  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button
          className="w-12 h-12 py-2 px-2 bg-black/90 hover:bg-black/90 rounded-full border border-black/90 
					hover:border-white shadow-none transition-colors"
        >
          <AiOutlineEdit className="text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="w-full h-full bg-black backdrop-blur-lg border-l-neutral-800 rounded-bl-2xl rounded-tl-2xl
								flex flex-col justify-center overflow-hidden 
								px-4 sm:px-20 md:px-20 xl:px-28 2xl:px-36
								gap-y-12"
								
      >
				{/* sphere */}
					<div className="radial-ellipse-dashboard w-full aspect-square
			fixed left-0 -bottom-[20%] md:-bottom-1/4 lg:-bottom-1/4
			  xl:-bottom-1/4 "></div>

        <SheetHeader>
          <SheetTitle className="text-white text-center text-7xl md:text-8xl lg:text-7xl 2xl:text-8xl 
					 font-poppins z-40 mb-4">
            Edit name
          </SheetTitle>
        </SheetHeader>

        {/* <div className="w-full flex flex-col items-center"> */}
				<form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-y-12">
					<Input 
					required
					placeholder="Name"
					name="projectName"
					defaultValue={selectedProject?.name}
					className="w-full py-6 text-neutral-400 hover:text-neutral-400 
          transition-colors bg-black rounded-2xl font-poppins text-sm 
          font-light z-40 border border-neutral-800 placeholder:text-neutral-600" 
					/>
        {/* </div> */}

        <SheetFooter className="w-full flex justify-center items-center">
          <SheetClose asChild>
            <Button
              className="py-6 w-full text-xl bg-white text-black font-poppins rounded-2xl z-40"
              type="submit"
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
				</form>
      </SheetContent>
    </Sheet>
  );
}
