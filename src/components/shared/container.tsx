import React from 'react'

import { cn } from '@/lib/utils'

interface Props {
	className?: string
	size?: 'original' | 'small'
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
	className,
	children,
	size = 'original'
}) => {
	return (
		<div
			className={cn(
				'mx-auto max-lg:mx-6',
				{ 'max-w-[1000px]': size === 'original' },
				{ 'max-w-[1000px]': size === 'small' },
				className
			)}
		>
			{children}
		</div>
	)
}
