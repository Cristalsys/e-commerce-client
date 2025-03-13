import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { PRomocode } from './Promocode'

export const metadata: Metadata = {
	title: 'Admin Promocode',
	...NO_INDEX_PAGE
}

export default function PromocodePage() {
	return <PRomocode />
}
