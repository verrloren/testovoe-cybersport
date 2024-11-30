'use client';

import { deleteProject } from "@/action/deleteProject"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
	DialogClose
} from "@/components/ui/dialog"
import { useProjectStore } from "@/store/useProjectStore";
import { TrashIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";
 

// interface DeleteProjectDialogProps {
// 	projects: Project[];
// }



export function DeleteProjectDialog() {


  const router = useRouter();
	const { selectedProject } = useProjectStore();

  const onDelete = async () => {
    if (!selectedProject) {
      toast.error('No project selected');
      return;
    }

    try {
      const result = await deleteProject(Number(selectedProject.id));

      if (result?.success) {
        toast.success('Project deleted successfully');
        router.refresh();
        document.getElementById('dialog-close-button')?.click();
      } else {
        toast.error(result?.response || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete project');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-12 h-12 py-2 px-2 bg-black rounded-full border 
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
          <DialogTitle className="text-white text-6xl text-center">Are you sure?</DialogTitle>
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