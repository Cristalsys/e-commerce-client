'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import React from 'react'

import type { ISidebarItem } from '../sidebar.data'

import { MenuItem } from './menu-item'

interface Props {
	title?: string
	menu: ISidebarItem[]
	isShowedSidebar?: boolean
}

export const SidebarMenu: React.FC<Props> = ({ menu, isShowedSidebar }) => {
	const pathname = usePathname()
	return (
		<nav>
			<ul>
				{menu.map(menuItem => {
					const props = {
						item: menuItem,
						isActive: !!match(menuItem.link)(pathname),
						isShowedSidebar
					}

					return (
						<MenuItem
							key={menuItem.label}
							{...props}
						/>
					)
				})}
			</ul>
		</nav>
	)
}
