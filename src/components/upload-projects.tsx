"use client";

import { useState, useRef, SetStateAction, Dispatch } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

type UploadProjectsProps = {
  onFilesUpdate?: Dispatch<SetStateAction<File[]>>;
};

export function UploadProjects({ onFilesUpdate }: UploadProjectsProps) {
  const [files, setFiles] = useState<File[]>([]);
  const pondRef = useRef<FilePond | null>(null);

  const handleFilesUpdate = (fileItems: File[]) => {
    setFiles(fileItems);
    onFilesUpdate?.(fileItems);
  };

  const handleClick = () => {
    pondRef.current?.browse();
  };

  return (
    <div
      onClick={handleClick}
      className="relative min-w-[35vw] aspect-square 
    		 rounded-full group cursor-pointer"
    >
      <div className="radial-ellipse-upload absolute top-0 left-0">
        <div className="rotating-background" />
      </div>
      
      {/* <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeIn" }}
        className="absolute text-radial-gradient text-lg font-poppins text-center z-10 
				group-hover:scale-110 transition-transform duration-300"
      >
        Drag & Drop <br /> your project here
      </motion.p> */}
      <FilePond
        ref={pondRef}
        files={files}
        // @ts-expect-error Type mismatch between FilePond and File[]
        onupdatefiles={handleFilesUpdate}
        allowMultiple={true}
        maxFiles={200}
        name="files"
        className="absolute left-0 top-0 w-full h-full hidden z-50"
        dropOnPage={false}
        dropOnElement={true}
        browseOnClick={false}
      />
    </div>
  );
}