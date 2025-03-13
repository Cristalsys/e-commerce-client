import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { USerEDit } from './UserEdit'
import type { TPageIdProp } from '@/types/page.types'

export const metadata: Metadata = {
	title: 'Setting User',
	...NO_INDEX_PAGE
}

export default async function UserEditPage({ params }: TPageIdProp) {
	const id = (await params).id
	return <USerEDit userId={id} />
}
