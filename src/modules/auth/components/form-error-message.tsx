'use client'

import { ExclamationMark } from "@/modules/auth/components/exclamation-mark";

interface FormErrorMessageProps {
	message: string | undefined;
}

export function FormErrorMessage({ message }: FormErrorMessageProps) {
	return (
		<div className="flex flex-row justify-center gap-x-2">
			<ExclamationMark />
			<p className="text-red-500 text-sm">{message}</p>
		</div>
	)
}
