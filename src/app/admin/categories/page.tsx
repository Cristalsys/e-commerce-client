import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CAtegories } from './Categories'

export const metadata: Metadata = {
	title: 'Admin Categories',
	...NO_INDEX_PAGE
}

export default function CategoryPage() {
	return <CAtegories />
}
