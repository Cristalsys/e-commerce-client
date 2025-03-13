import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import MainStatistics from './MainStatistics'
import { MIddleSTatistics } from './MiddleStatistics'

export const metadata: Metadata = {
	title: 'Admin Statistics',
	...NO_INDEX_PAGE
}

export default function StatisticsPage() {
	return (
		<div className=''>
			<MainStatistics />
			<MIddleSTatistics />
		</div>
	)
}
