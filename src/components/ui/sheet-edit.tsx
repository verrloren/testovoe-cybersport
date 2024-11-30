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

import { Input } from "./input";
import { useRouter } from "next/navigation";
import { editProjectName } from "@/action/editProjectName";
import { useState } from "react";
import toast from "react-hot-toast";
import { useProjectStore } from "@/store/useProjectStore";


export function SheetEdit() {


	const router = useRouter();
	const { selectedProject, updateProjectName} = useProjectStore();
	const [newProjectName, setNewProjectName] = useState('');
	

  const onNameEdit = async () => {
    if (!selectedProject) {
      toast.error('No project selected');
      return;
    }

    if (!newProjectName) {
      toast.error('Please enter a name');
      return;
    }

    try {
      const result = await editProjectName(Number(selectedProject.id), newProjectName);

      if (result?.success) {
				updateProjectName(selectedProject.id, newProjectName);
        toast.success('Project name updated successfully');
        router.refresh();
        document.getElementById('dialog-close-button')?.click();
      } else {
        toast.error(result?.response || 'Failed to update name');
      }
    } catch (error) {
      console.error('Edit error:', error);
      toast.error('Failed to update name');
    }
  };

  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button
          className="w-12 h-12 py-2 px-2 bg-black rounded-full border
					border-neutral-800 hover:border-neutral-200 transition-colors peer"
        >
          <AiOutlineEdit className="text-white peer-hover:text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="w-full h-full bg-black  backdrop-blur-lg border-l-neutral-800 rounded-bl-2xl rounded-tl-2xl
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

        <div className="w-full flex flex-col items-center">
					<Input 
					value={newProjectName}
					onChange={(e) => setNewProjectName(e.target.value)}
					className="w-full py-6 text-neutral-400 hover:text-neutral-400 
          transition-colors bg-black rounded-2xl font-poppins text-sm 
          font-light z-40 border border-neutral-800 placeholder:text-neutral-600" 
					placeholder="Name" 
					/>
        </div>

        <SheetFooter className="w-full flex justify-center items-center">
          <SheetClose asChild>
            <Button
              className="py-6 w-full text-xl bg-white text-black font-poppins rounded-2xl z-40"
              type="submit"
							onClick={onNameEdit}
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
