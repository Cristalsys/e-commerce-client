'use client'

import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import { SalesTooltip } from './sales-tooltip'
import type { ISalesByWeek } from '@/services/statistics.service'

interface Props {
	data: ISalesByWeek[]
}

export const SalesChart: React.FC<Props> = ({ data }) => {
	return (
		<div className='rounded-l'>
			<ResponsiveContainer
				width='100%'
				height={300}
			>
				<BarChart
					data={data}
					width={500}
					height={300}
				>
					<XAxis
						tickLine={false}
						axisLine={false}
						dataKey='date'
						style={{ fontSize: '12px' }}
						tickMargin={12}
					/>
					<Tooltip
						cursor={{ fill: 'transparent' }}
						content={<SalesTooltip />}
					/>
					<Bar
						dataKey='total'
						fill='#1C4632'
						activeBar={<Rectangle fill='#303631' />}
						radius={[7, 7, 7, 7]}
						barSize={36}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}
