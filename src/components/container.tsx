'use client'

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
	return (	
		<div className="mx-12 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">{children}</div>
	)
}
