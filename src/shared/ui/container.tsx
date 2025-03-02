'use client'

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
	return (	
		<div className="mx-4 md:mx-6 lg:mx-8 xl:mx-8 2xl:mx-12 relative">{children}</div>
	)
}
