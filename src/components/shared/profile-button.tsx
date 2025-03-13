'use client'

import { CircleUser, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '../ui'

import { useTypedSelector } from '@/store'

interface Props {
	className?: string
}

export const ProfileButton: React.FC<Props> = ({ className }) => {
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	return (
		<div className={className}>
			{!isLoggedIn ? (
				<Link href='/login'>
					<Button
						variant='secondary'
						type='button'
					>
						<User />
						{'Login'}
					</Button>
				</Link>
			) : (
				<Link href='/profile'>
					<Button
						variant='secondary'
						type='button'
					>
						<CircleUser size={18} />
						{'Profile'}
					</Button>
				</Link>
			)}
		</div>
	)
}
