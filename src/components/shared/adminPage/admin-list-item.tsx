import { useTheme } from 'next-themes'
import Image from 'next/image'
import React from 'react'

import { AdminActions } from './admin-actions'
import type { IListItem } from './admin-list'

interface Props {
	listItem: IListItem
	removeHandler?: (id: string) => void
	className?: string
}

export const AdminListItem: React.FC<Props> = ({ listItem, removeHandler }) => {
	const { theme } = useTheme()

	return (
		<div
			className={`flex items-center max-lg:flex-col max-lg:items-start justify-between ${theme === 'dark' ? 'bg-secondary' : 'bg-gray-100'}  mt-4 px-5 rounded-md transition-color ${theme === 'dark' ? 'hover:bg-secondary' : 'hover:bg-gray-200'}`}
		>
			{listItem.items.map((value, index) => (
				<div
					className=' py-3 w-[24%] text-sm max-lg:w-full pr-2'
					key={`${value}-${index}`}
				>
					{typeof value === 'string' && value.startsWith('/') ? (
						<Image
							src={value}
							width={50}
							height={50}
							alt='Product image'
						/>
					) : (
						<span>{value}</span>
					)}
				</div>
			))}

			<div className='text-white py-3 w-[24%] text-right max-lg:w-full max-lg:text-left'>
				<AdminActions
					viewUrl={listItem.viewUrl}
					editUrl={listItem.editUrl}
					removeHandler={removeHandler}
				/>
			</div>
		</div>
	)
}
