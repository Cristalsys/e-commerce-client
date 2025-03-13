import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Orders from './Orders'

export const metadata: Metadata = {
	title: 'PlantShop | Orders',
	...NO_INDEX_PAGE
}

export default function ProfilePage() {
	return <Orders />
}
