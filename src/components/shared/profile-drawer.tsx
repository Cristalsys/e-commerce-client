import React from 'react'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/ui/sheet'

import { Logout } from '../layout/sidebar/logout'
import { SidebarMenu } from '../layout/sidebar/menus/sidebar-menu'
import { ADMIN_SIDEBAR_DATA, SIDEBAR_DATA } from '../layout/sidebar/sidebar.data'

interface Props {
	className?: string
	hasAdmin: boolean
}

export const ProfileDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, hasAdmin }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				side='left'
				className='max-h-screen overflow-y-auto px-16 py-8'
			>
				<SheetHeader className='text-left'>
					<SheetTitle></SheetTitle>
				</SheetHeader>
				{!hasAdmin ? (
					<SidebarMenu menu={SIDEBAR_DATA} />
				) : (
					<SidebarMenu menu={ADMIN_SIDEBAR_DATA} />
				)}
				<Logout />
			</SheetContent>
		</Sheet>
	)
}
