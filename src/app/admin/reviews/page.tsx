import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { REviews } from './Reviews'

export const metadata: Metadata = {
	title: 'Admin Reviews',
	...NO_INDEX_PAGE
}

export default function ReviewPage() {
	return <REviews />
}
