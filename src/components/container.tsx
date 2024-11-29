'use client'

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
	return (	
		<div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48 2xl:mx-60">{children}</div>
	)
}
