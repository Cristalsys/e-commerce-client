import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ORderSHow } from './OrderShow'
import type { TPageIdProp } from '@/types/page.types'

export const metadata: Metadata = {
	title: 'Show Order',
	...NO_INDEX_PAGE
}

export default async function OrderEditPage({ params }: TPageIdProp) {
	const id = (await params).id
	return <ORderSHow orderId={id} />
}
