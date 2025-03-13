'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { PAGE } from '@/config/public-page.config'

import { authService } from '@/services/auth.service'
import { useTypedSelector } from '@/store'

interface Props {
	className?: string
}

export const Logout: React.FC<Props> = ({ }) => {
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.setQueryData(['get-profile'], null)
			router.push(PAGE.HOME)
		}
	})

	const { isLoggedIn } = useTypedSelector(state => state.auth)

	if (!isLoggedIn) return null

	return (
		<div className='border-t border-gray-300'>
			<button
				onClick={() => mutate()}
				className={'group py-4 flex items-center  gap-5'}
				title='Logout'
			>
				<LogOut className={'min-w-6 group-hover:text-primary transition group-hover:rotate-6'} />
				<span>{isPending ? 'Please wait...' : 'Logout'}</span>
			</button>
		</div>
	)
}
