// pages/auth/github/callback.tsx
'use client'

import Cookies from 'js-cookie'
import { Loader } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { setAuthData } from '@/store/auth.slice'

import { store } from '@/store'
import { EnumTokens } from '@/types/auth.types'

// pages/auth/github/callback.tsx

const GithubAuthCallback = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const accessToken = searchParams.get('access_token')
	const userData = new URLSearchParams(window.location.search).get('user_data')

	useEffect(() => {
		if (accessToken) {
			Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
				domain: 'localhost',
				expires: 1 / 24,
				sameSite: 'strict',
				secure: true
			})
			if (userData) {
				store.dispatch(setAuthData(JSON.parse(userData)))
			}
			router.push('/')
		}
	}, [accessToken, router, userData])

	return (
		<div className='flex h-screen w-full items-center justify-center'>
			<Loader className='w-5 h-5 animate-spin' />
		</div>
	)
}

export default GithubAuthCallback
