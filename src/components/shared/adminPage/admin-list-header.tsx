import React from 'react'

import { cn } from '@/lib/utils'

interface Props {
	headerItems: string[]
	className?: string
}

export const AdminListHeader: React.FC<Props> = ({ headerItems }) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between mt-4 px-5 rounded-md transition-color',
				'bg-primary shadow-lg mt-8'
			)}
		>
			{headerItems.map(value => (
				<div
					key={value}
					className='text-white py-2.5 font-medium w-1/4 pr-2'
				>
					{value}
				</div>
			))}

			<div className='text-white py-2.5 font-medium w-1/4 text-right justify-end'>Actions</div>
		</div>
	)
}
