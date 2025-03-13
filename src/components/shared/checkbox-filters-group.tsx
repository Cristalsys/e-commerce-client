'use client'

import { useTheme } from 'next-themes'
import React from 'react'

import { Skeleton } from '@/ui/skeleton'

import { Input } from '../ui'

import { FilterCheckbox, type FilterCheckboxProps } from './filter-checkbox'

type Item = FilterCheckboxProps

interface Props {
	title: string
	items: Item[]
	limit?: number
	loading?: boolean
	searchInputPlaceholder?: string
	onClickCheckbox?: (id: string) => void
	selected?: Set<string>
	name?: string
	className?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	className,
	title,
	items,
	name,
	limit = 3,
	loading,
	searchInputPlaceholder = 'Search...',
	onClickCheckbox,
	selected
}) => {
	const [showAll, setShowAll] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')
	const { theme } = useTheme()

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	if (loading) {
		return (
			<div className={className}>
				<p className='font-bold mb-3'>{title}</p>

				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton
							key={index}
							className='h-6 mb-4 rounded-[8px]'
						/>
					))}

				<Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
			</div>
		)
	}

	const list = showAll
		? items.filter(item =>
				(typeof item.text === 'string' ? item.text.toLowerCase() : '').includes(
					searchValue.toLocaleLowerCase()
				)
			)
		: items.slice(0, limit)

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						onChange={onChangeSearchInput}
						placeholder={searchInputPlaceholder}
						className={`${theme !== 'dark' ? 'bg-gray-100' : 'bg-secondary'} border-none`}
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={selected?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						name={name}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? 'mt-0' : ''}>
					<button
						onClick={() => setShowAll(!showAll)}
						className='text-primary mt-3'
					>
						{showAll ? 'Close' : '+ Show all'}
					</button>
				</div>
			)}
		</div>
	)
}
