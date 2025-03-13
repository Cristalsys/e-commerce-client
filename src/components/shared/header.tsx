'use client'

import { Leaf, Menu as MenuButton } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

import { Button } from '../ui'

import { ADminBUtton } from './AdminButton'
import { CartButton } from './cart-button'
import { Container } from './container'
import { FavoriteButtonHeader } from './favorite-button-header'
import { Menu } from './homePage'
import { MenuDrawer } from './menu-drawer'
import { ProfileButton } from './profile-button'
import { SearchInput } from './search-input'
import { ToggleTheme } from './toggle-theme'
import { cn } from '@/lib/utils'

interface Props {
	hasSearch?: boolean
	className?: string
}

export const Header: React.FC<Props> = ({ className, hasSearch = false }) => {
	const router = useRouter()

	const searchParams = useSearchParams()

	React.useEffect(() => {
		let toastMessage = ''
		let cancelMessage = ''

		if (searchParams.has('paid')) {
			toastMessage = 'The order has been successfully paid'
		}

		if (searchParams.has('cancel')) {
			cancelMessage = 'The order has not been paid!'
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMessage, {
					duration: 3000
				})
			}, 1000)
		}

		if (cancelMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.error(cancelMessage, {
					duration: 3000
				})
			}, 1000)
		}
	}, [router, searchParams])

	return (
		<header className={cn('sticky top-0 bg-background py-2 shadow-lg z-10 w-full', className)}>
			<Container className='flex items-center justify-between py-2'>
				<Link href='/'>
					<div
						className='flex items-center gap-2'
						title='PlantShop'
					>
						<Leaf className='text-primary' />
						<h1 className='uppercase font-black'>PlantShop</h1>
					</div>
				</Link>

				{hasSearch ? (
					<div className='mx-10 flex-1 max-md:mr-0 max-md:ml-6'>
						<SearchInput />
					</div>
				) : (
					<div className='flex items-center gap-10 max-lg:hidden'>
						<Menu />
					</div>
				)}

				<div className='flex items-center gap-4'>
					<ADminBUtton className='max-lg:hidden' />
					<ProfileButton className='max-lg:hidden' />

					<FavoriteButtonHeader className='max-lg:hidden' />
					<CartButton className={cn('', { 'max-md:hidden': hasSearch })} />
					<ToggleTheme className='max-lg:hidden' />
					<MenuDrawer hasSearch={hasSearch}>
						<Button
							variant={'ghost'}
							className='lg:hidden'
						>
							<MenuButton />
						</Button>
					</MenuDrawer>
				</div>
			</Container>
		</header>
	)
}
