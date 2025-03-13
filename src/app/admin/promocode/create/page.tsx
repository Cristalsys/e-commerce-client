import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CReatePRomocode } from './CreatePromocode'

export const metadata: Metadata = {
	title: 'Admin Promocode Create',
	...NO_INDEX_PAGE
}

export default function CreateProductPage() {
	return <CReatePRomocode />
}
