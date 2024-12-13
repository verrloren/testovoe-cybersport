import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendDefaultStyleGuide } from "./sendDefaultStyleGuide";
import toast from "react-hot-toast";

export const useSaveStyleGuides = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveGuides = async (guideIds: number[]) => {
    if (guideIds.length === 0) {
      throw new Error("Please select at least one style guide");
    }

    try {
      setLoading(true);
      await Promise.all(
        guideIds.map(id => sendDefaultStyleGuide(id))
      );
      toast.success("Style guides updated successfully");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update style guides";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { saveGuides, loading };
};