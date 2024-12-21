import { motion } from "framer-motion";

type FileListProps = {
  files: File[];
};

export function FileList({ files }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full p-4"
    >
      <h3 className="text-xl font-semibold mb-4">Uploaded Files</h3>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li key={index} className="flex items-center gap-2 text-sm mt-12">
            
            <h6 className="text-neutral-600 border border-neutral-800 bg-neutral-950 rounded-xl px-4 py-1"><span className="w-4 h-4 mr-2">📄</span>{file.filename}</h6>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
