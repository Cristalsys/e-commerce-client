import React from 'react'

import { Skeleton } from '@/ui/skeleton'

interface Props {
	className?: string
}

export const StatisticItemLoading: React.FC<Props> = ({}) => {
	return (
		<div className='bg-gray-100 p-4 rounded-lg'>
			<div className='flex items-center justify-between space-y-0 pb-2 '>
				<Skeleton className='h-5 w-24' />
				<Skeleton className='size-[22px]' />
			</div>
			<Skeleton className='h-7 w-16 mt-2' />
		</div>
	)
}
