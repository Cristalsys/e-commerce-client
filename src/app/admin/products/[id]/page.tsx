import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ProductEDit } from './productEdit'
import type { TPageIdProp } from '@/types/page.types'

export const metadata: Metadata = {
	title: 'Setting Product',
	...NO_INDEX_PAGE
}

export default async function ProductEditPage({ params }: TPageIdProp) {
	const id = (await params).id
	return <ProductEDit productId={id} />
}
