import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CAtegoryEDit } from './CategoryEdit'
import type { TPageIdProp } from '@/types/page.types'

export const metadata: Metadata = {
	title: 'Setting Category',
	...NO_INDEX_PAGE
}

export default async function CategoryEditPage({ params }: TPageIdProp) {
	const id = (await params).id
	return <CAtegoryEDit categoryId={id} />
}
