import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Users } from './Users'

export const metadata: Metadata = {
	title: 'Admin Users',
	...NO_INDEX_PAGE
}

export default function UserPage() {
	return <Users />
}
