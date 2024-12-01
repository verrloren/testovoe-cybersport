'use client'

import { AiOutlineFilePdf } from "react-icons/ai";
import { Button } from "./button";
import toast from "react-hot-toast";
import { getPdf } from "@/action/getPdf";
import { useProjectStore } from "@/store/useProjectStore";
import { useState } from "react";


export function ButtonPdf() {

	const [pdfLoading, setPdfLoading] = useState(false);
  const { selectedProject } = useProjectStore();

	const handlePdfDownload = async () => {
    if (!selectedProject) {
      toast.error('No project selected');
      return;
    }

    try {
      setPdfLoading(true);
      const pdfBlob = await getPdf(selectedProject.id);
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedProject.name}-report.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('PDF download error:', error);
      toast.error('Failed to download PDF');
    } finally {
      setPdfLoading(false);
    }
  };

	return (
<Button
        onClick={handlePdfDownload}
        disabled={pdfLoading || !selectedProject}
        className="w-12 h-12 py-2 px-2 bg-black rounded-full border 
        border-neutral-800 hover:border-neutral-200 transition-colors peer"
      >
        {pdfLoading ? (
          <div className="animate-spin">⌛</div>
        ) : (
          <AiOutlineFilePdf className="text-white peer-hover:text-white" />
        )}
      </Button>
	)
}
