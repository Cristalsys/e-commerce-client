'use client'

import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { PAGE } from '@/config/public-page.config'

import { useProfile } from '@/hooks/useProfile'

import { Button } from '../ui'

import { cn } from '@/lib/utils'
import { useTypedSelector } from '@/store'

interface Props {
	className?: string
}

export const FavoriteButtonHeader: React.FC<Props> = ({ className }) => {
	const { profile } = useProfile()
	const router = useRouter()
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	return (
		<div className={cn(!isLoggedIn && 'hidden', className)}>
			<Button
				onClick={() => router.push(PAGE.FAVORITES)}
				variant={'ghost'}
				className={cn('relative flex items-center justify-center h-9 w-9', className)}
			>
				<Heart className='!size-6' />
				<span className='absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full'>
					{profile?.favorites?.length}
				</span>
			</Button>
		</div>
	)
}
