import { Eye, EyeOff } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

interface Props {
	className?: string
	showPassword: boolean
	onClick?: () => void
}

export const ShowPasswordButton: React.FC<Props> = ({ onClick, className, showPassword }) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className={cn(
				'absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer',
				className
			)}
		>
			{showPassword ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
		</button>
	)
}
