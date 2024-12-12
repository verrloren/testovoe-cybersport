"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useProjectsStore } from "@/modules/projects/projects-store";
import { TrashIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { useDeleteProjectMutation } from "../use-delete-project";

export function DeleteProjectDialog() {
  const selectedProject = useProjectsStore((state) => state.selectedProject);
  const { deleteProject } = useDeleteProjectMutation();

	const isOpen = useProjectsStore((state) => state.isDeleteDialogOpen);
  const setIsOpen = useProjectsStore((state) => state.setDeleteDialogOpen);

  const onDelete = async () => {
    if (!selectedProject) {
      toast.error("No project selected");
      return;
    }
    try {
      await deleteProject(selectedProject.id);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete project");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-12 h-12 py-2 px-2 bg-black hover:bg-black rounded-full border 
          border-neutral-800 hover:border-neutral-200 transition-colors peer"
        >
          <TrashIcon className="text-white peer-hover:text-white" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-full py-8 bg-black border-l-neutral-800 rounded-2xl
          flex flex-col justify-center overflow-hidden border-neutral-800
          px-8 gap-y-12"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-6xl text-center">
            Are you sure?
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-neutral-600 font-poppins text-lg text-center">
          Deleting this project will permanently remove it from your account.
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
            disabled={!selectedProject}
            className="py-6 w-full text-xl bg-red-600 text-white font-poppins rounded-2xl z-40 transition-colors hover:bg-red-500"
            type="submit"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
