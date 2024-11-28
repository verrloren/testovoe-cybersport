'use client'
interface StatusIndicatorProps {
	status: string;
	size?: string;
}

export function StatusIndicator({ status, size }: StatusIndicatorProps) {
	return (
		<div className={`rounded-full
		${size === "sm" && "w-2 h-2"}
		${size === "lg" && "w-3 h-3"}
		${status === "default" && "bg-black border border-neutral-900"}
		${status === "success" && "bg-green-500 "}
		${status === "warning" && "bg-yellow-500 "}
		${status === "error" && "bg-red-600 "}
		`}
		></div>
	)
}
