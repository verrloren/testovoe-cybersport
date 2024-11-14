'use client'

import Image from "next/image"

interface CardImageProps {
	url: string;
}

export function CardImage({ url }: CardImageProps) {
	return (
		<Image
			src={url}
			alt="hotel"
			className="object-cover h-56 w-full"
			width={1032}
			height="100"
		/>
	)
}
