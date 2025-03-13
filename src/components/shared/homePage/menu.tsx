'use client'

import React from 'react'
import { useSelector } from 'react-redux'

import { MENU_DATA } from '@/constants/menu/menu.data'

import { cn } from '@/lib/utils'

export const Menu: React.FC = () => {
	const activeSection = useSelector(
		(state: { activeSection: { activeSection: string } }) => state.activeSection.activeSection
	)

	const scrollToSection = (id: string) => {
		const section = document.getElementById(id)
		const headerHeight = 49
		if (section) {
			window.scrollTo({
				top: section.offsetTop - headerHeight,
				behavior: 'smooth'
			})
		}
	}

	return (
		<>
			{MENU_DATA.map(menuItem => {
				return (
					<div
						key={menuItem.label}
						title={menuItem.label}
						onClick={() => scrollToSection(menuItem.label)}
					>
						<span
							className={cn('font-semibold transition duration-300 text-sm cursor-pointer', {
								"relative text-primary after:content-[''] after:absolute after:bottom-[-0.5rem] after:left-0 after:w-1/2 after:h-[2px] after:bg-primary":
									activeSection === menuItem.label
							})}
						>
							{menuItem.label}
						</span>
					</div>
				)
			})}
		</>
	)
}
