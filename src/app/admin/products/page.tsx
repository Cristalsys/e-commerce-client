import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { PRoducts } from './Products'

export const metadata: Metadata = {
	title: 'Admin Products',
	...NO_INDEX_PAGE
}

export default function ProductPage() {
	return <PRoducts />
}
