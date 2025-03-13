import { Check } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const AboutDetails: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return (
		<div className={cn('inline-flex gap-x-2', className)}>
			<span className='bg-primary text-white w-4 h-4'>
				<Check size={16} />
			</span>
			<p className='text-xs font-semibold'>{children}</p>
		</div>
	)
}
