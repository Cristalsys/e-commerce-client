'use client'

import { useQuery } from '@tanstack/react-query'

import { StatisticItem, StatisticItemLoading } from '@/components/shared/adminPage'

import { statisticsService } from '@/services/statistics.service'

const MainStatistics: React.FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get main statistics'],
		queryFn: () => statisticsService.getMain()
	})

	return (
		<div>
			<div className='grid grid-cols-4 gap-4 my-5 max-lg:grid-cols-2'>
				{isLoading ? (
					Array.from({ length: 4 }).map((_, index) => <StatisticItemLoading key={index} />)
				) : data ? (
					data.data.map(item => (
						<StatisticItem
							key={item.id}
							item={item}
						/>
					))
				) : (
					<div>There is no data for statistics</div>
				)}
			</div>
		</div>
	)
}

export default MainStatistics
