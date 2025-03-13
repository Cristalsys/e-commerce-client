'use client'

import { Leaf } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'

import { Container } from './container'
import { ProfileButton } from './profile-button'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const HeaderCheckout: React.FC<Props> = ({ className }) => {
	const { theme } = useTheme()

	return (
		<header className={cn(`${theme !== 'dark' ? 'bg-[#F6F3F1]' : 'bg-secondary'}`, className)}>
			<Container className='flex items-center justify-between py-4 border-b border-gray-200'>
				<Link href='/'>
					<div
						className='flex items-center gap-2'
						title='PlantShop'
					>
						<Leaf className='text-primary' />
						<h1 className='uppercase font-black'>PlantShop</h1>
					</div>
				</Link>
				<ProfileButton />
			</Container>
		</header>
	)
}
