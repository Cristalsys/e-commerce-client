import React, { type PropsWithChildren } from 'react'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/ui/sheet'

import { Separator } from '../ui'

import { ADminBUtton } from './AdminButton'
import { CartButtonMenu } from './cart-button-menu'
import { FavoriteButtonHeader } from './favorite-button-header'
import { Menu } from './homePage'
import { ProfileButton } from './profile-button'
import { ToggleTheme } from './toggle-theme'

interface Props {
	hasSearch: boolean
}

export const MenuDrawer: React.FC<PropsWithChildren<Props>> = ({ children, hasSearch }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle></SheetTitle>
					<div className='flex flex-col gap-5 pt-4 pl-8 max-md:items-start'>
						{!hasSearch && (
							<>
								<Menu />
								<Separator />
							</>
						)}
						<div className='flex gap-x-1 text-sm items-center'>
							Toggle theme: <ToggleTheme />
						</div>
						<div className='flex -mt-2 gap-x-1 text-sm items-center'>
							Favorites: <FavoriteButtonHeader />
						</div>
						<div className='flex -mt-2 gap-x-1 text-sm items-center'>
							Cart: <CartButtonMenu />
						</div>
						<div className='flex -mt-2 gap-x-1 text-sm items-center'>
							Admin Panel: <ADminBUtton />
						</div>

						<ProfileButton />
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}
