import React from 'react'

import { SidebarHeader } from './header/sidebar-header'
import { Logout } from './logout'
import { SidebarMenu } from './menus/sidebar-menu'
import { ADMIN_SIDEBAR_DATA, SIDEBAR_DATA } from './sidebar.data'

interface Props {
	isShowedSidebar: boolean
	className?: string
	hasAdmin?: boolean
}

export const Sidebar: React.FC<Props> = ({ isShowedSidebar, hasAdmin }) => {
	return (
		<aside className='py-4 border-r border-gray-300 whitespace-nowrap overflow-hidden max-md:hidden'>
			<SidebarHeader hasAdmin={hasAdmin ?? false} />
			{hasAdmin ? (
				<SidebarMenu
					menu={ADMIN_SIDEBAR_DATA}
					isShowedSidebar={isShowedSidebar}
				/>
			) : (
				<>
					<SidebarMenu
						menu={SIDEBAR_DATA}
						isShowedSidebar={isShowedSidebar}
					/>
				</>
			)}
			<Logout />
		</aside>
	)
}
