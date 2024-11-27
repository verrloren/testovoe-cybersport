'use client'
interface StatusIndicatorProps {
	status: "default" | "success" | "warning" | "error";
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
	return (
		<div className={`w-3 h-3 rounded-full
		${status === "default" && "bg-black border border-neutral-900"}
		${status === "success" && "bg-green-500 "}
		${status === "warning" && "bg-yellow-500 "}
		${status === "error" && "bg-red-500 "}
		`}
		></div>
	)
}
