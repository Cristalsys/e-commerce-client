import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Login } from './login'

export const metadata: Metadata = {
	title: 'login',
	...NO_INDEX_PAGE
}

export default function LoginPage() {
	return <Login />
}
