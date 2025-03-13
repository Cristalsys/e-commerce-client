'use client'

import { ShieldAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { ADMIN_PAGE } from '@/config/admin-page.config'

import { useProfile } from '@/hooks/useProfile'

import { Button } from '../ui'

import { cn } from '@/lib/utils'
import { EnumRole } from '@/types/user.types'

interface Props {
	className?: string
}

export const ADminBUtton: React.FC<Props> = ({ className }) => {
	const { profile } = useProfile()
	const router = useRouter()
	return (
		<div className={className}>
			{profile && profile.role === EnumRole.ADMIN && (
				<Button
					onClick={() => router.push(ADMIN_PAGE.STATISTICS)}
					variant={'ghost'}
					className={cn('relative flex items-center justify-center h-9 w-9', className)}
				>
					<ShieldAlert className='!size-6' />
				</Button>
			)}
		</div>
	)
}
