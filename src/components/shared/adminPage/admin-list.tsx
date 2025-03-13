import React from 'react'

import { Skeleton } from '@/ui/skeleton'

import { AdminListHeader } from './admin-list-header'
import { AdminListItem } from './admin-list-item'

export interface IListItem {
	id: string
	editUrl?: string
	viewUrl?: string
	items: React.ReactNode[]
}

interface Props {
	listItems: IListItem[]
	headerItems: string[]
	isLoading: boolean
	removeHandler?: (id: string) => void
	className?: string
}

export const AdminList: React.FC<Props> = ({
	className,
	listItems,
	headerItems,
	isLoading,
	removeHandler
}) => {
	return (
		<div className={className}>
			<div className='mb-12'>
				<AdminListHeader headerItems={headerItems} />

				{isLoading ? (
					<div className='space-y-4 mt-4'>
						{Array.from({ length: 5 }).map((_, index) => (
							<Skeleton
								key={index}
								className='h-11'
							/>
						))}
					</div>
				) : listItems.length ? (
					listItems.map(listItem => (
						<AdminListItem
							key={listItem.id}
							listItem={listItem}
							removeHandler={removeHandler ? () => removeHandler(listItem.id) : undefined}
						/>
					))
				) : (
					<div className={'mt-2 text-white text-center py-3'}>Elements has not found</div>
				)}
			</div>
		</div>
	)
}
