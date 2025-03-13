import cn from 'clsx'
import Link from 'next/link'

import type { ISidebarItem } from '../sidebar.data'

export interface IMenuItemProps {
	item: ISidebarItem
	isActive: boolean
	isShowedSidebar?: boolean
}

export function MenuItem({ item, isActive, isShowedSidebar }: IMenuItemProps) {
	return (
		<li>
			<Link
				href={item.link}
				className={cn('group py-3 flex items-center gap-5')}
				title={item.label}
			>
				<item.icon
					className={cn('min-w-6', {
						'group-hover:text-primary transition group-hover:rotate-6': !isActive,
						'text-primary fill-primary': isActive && !isShowedSidebar
					})}
				/>
				<span
					className={cn('border-b ', {
						'border-primary text-primary': isActive,
						'border-transparent': !isActive
					})}
				>
					{item.label}
				</span>
			</Link>
		</li>
	)
}
