'use client'

import { FileWarning } from "lucide-react";

interface ErrorClientProps {
	error: string;
}

export function ErrorClient({ error }: ErrorClientProps) {
	return (
		<div className="bg-[#0F1318] h-full w-full flex-center rounded-[8px] px-4">
			<FileWarning className="text-[#EB0237]" />
			<p className="text-white">{error}</p>
		</div>
	)
}
