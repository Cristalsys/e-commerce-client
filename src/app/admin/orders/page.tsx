import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ORders } from './Orders'

export const metadata: Metadata = {
	title: 'Admin Orders',
	...NO_INDEX_PAGE
}

export default function OrderPage() {
	return <ORders />
}
