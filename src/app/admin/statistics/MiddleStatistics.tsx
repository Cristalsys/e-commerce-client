'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React from 'react'

import { SalesChart } from '@/components'
import { statisticsService } from '@/services/statistics.service'

interface Props {
	className?: string
}

export const MIddleSTatistics: React.FC<Props> = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get middle statistics'],
		queryFn: () => statisticsService.getMiddle()
	})

	if (isLoading)
		return (
			<div className='h-[390px] w-full flex items-center justify-center'>
				<Loader className='w-5 h-5 animate-spin' />
			</div>
		)

	return (
		<div>
			{data?.data ? (
				<>
					<div className=''>
						<SalesChart data={data.data.salesByWeek} />
					</div>
				</>
			) : (
				<div>There is no data for statistics</div>
			)}
		</div>
	)
}
