import { useTheme } from 'next-themes'
import React from 'react'
import CountUp from 'react-countup'

import { Title } from '../title'

import { getIcon } from '@/lib/get-icon'
import type { IStatisticsResponse } from '@/services/statistics.service'

interface Props {
	className?: string
	item: IStatisticsResponse
}

export const StatisticItem: React.FC<Props> = ({ className, item }) => {
	const Icon = getIcon(item.id)
	const { theme } = useTheme()

	return (
		<div
			className={`${theme !== 'dark' ? 'bg-gray-100' : 'bg-secondary'} p-4 rounded-lg ${className}`}
		>
			<div className='flex items-center justify-between space-y-0 pb-2 '>
				<p className='font-bold'>{item.name}</p>
				<Icon size={22} />
			</div>
			<Title>
				<CountUp end={item.value} />
			</Title>
		</div>
	)
}
