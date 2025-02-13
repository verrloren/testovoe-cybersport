"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { TrashIcon } from "@radix-ui/react-icons";

import {
	Button,
	Loader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shared";
import { useProjectsStore } from "@/features/projects";
import { useDeleteStyleGuideMutation } from "@/features/styleguides";


interface DeleteStyleGuideDialogProps {
  styleguideId?: number;
  bg?: string;
  border?: string;
  text?: string;
  rounded?: string;
  wfull?: string;
}


export function DeleteStyleGuideDialog({ styleguideId, bg, border, text, rounded, wfull }: DeleteStyleGuideDialogProps) {
  const { deleteStyleGuide } = useDeleteStyleGuideMutation();
	const [isLoading, setIsLoading] = useState(false);

	const isOpen = useProjectsStore((state) => state.isDeleteDialogOpen);
  const setIsOpen = useProjectsStore((state) => state.setDeleteDialogOpen);

  const onDelete = async () => {

    try {
			setIsLoading(true);
			setIsOpen(false);
			if(styleguideId) {
				await deleteStyleGuide(styleguideId);
				setIsOpen(false);
			}
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete style guide.");
    }
  };

  return (
<>
<Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
			<Button
          className={`h-12 py-2 px-2 border border-black/90 hover:border-white shadow-none transition-colors 
						${wfull === "wfull" ? "w-full" : "w-12"} 
						${border === "none" ? "border-none" : "border border-black/90 hover:border-white"}
						${bg === "black" ? "bg-black/90 hover:bg-black/90" : "bg-neutral-950"} 
						${rounded === "full" ? "rounded-full" : "rounded-lg"} 
					`}>
          <TrashIcon className="text-white peer-hover:text-white peer-hover:rotate-90" /> {text ?? text}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-full py-8 bg-neutral-950 border-l-neutral-800 rounded-2xl
          flex flex-col justify-center overflow-hidden border-neutral-800
          px-8 gap-y-12"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-6xl text-center">
            Are you sure?
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-neutral-600 font-poppins text-lg text-center">
          Deleting this style guide will permanently remove it from your account.
        </DialogDescription>

        <DialogFooter className="flex flex-row items-center gap-x-8">
          <DialogClose
            id="dialog-close-button"
            className="py-3 w-full text-xl bg-transparent border border-neutral-800 text-white font-poppins rounded-2xl z-40 hover:border-neutral-600 transition-colors hover:brightness-125"
            type="submit"
          >
            Cancel
          </DialogClose>
          <Button
            className="py-6 w-full text-xl bg-red-600 text-white font-poppins rounded-2xl z-40 transition-colors hover:bg-red-500"
            type="submit"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
		{isLoading && <Loader loading={true} />}
		</>
  );
}
