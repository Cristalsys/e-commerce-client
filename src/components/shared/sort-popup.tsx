'use client'

import { ArrowUpDown } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import React, { useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Button } from '../ui'

import { cn } from '@/lib/utils'
import { EnumProductSort } from '@/types/product.types'

interface Props {
	className?: string
}

const sortingOptions = [
	{ value: EnumProductSort.HIGH_PRICE },
	{ value: EnumProductSort.LOW_PRICE },
	{ value: EnumProductSort.NEWEST },
	{ value: EnumProductSort.OLDEST }
]

export const SortPopup: React.FC<Props> = ({ className }) => {
	const isMounted = React.useRef(false)
	const router = useRouter()
	const searchParams = useSearchParams()

	const [open, setOpen] = React.useState(false)
	const [selectedSort, setSelectedSort] = useState(
		searchParams.get('sort') || EnumProductSort.NEWEST
	)

	React.useEffect(() => {
		if (isMounted.current) {
			const currentQuery = qs.parse(window.location.search, { ignoreQueryPrefix: true })
			const params = {
				...currentQuery,
				sort: selectedSort
			}

			const query = qs.stringify(params, {
				arrayFormat: 'comma'
			})

			router.push(`?${query}`, {
				scroll: false
			})
		}

		isMounted.current = true
	}, [router, selectedSort])

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<div className={cn('rounded-2xl mb-2 cursor-pointer', className)}>
					<Button
						variant={'ghost'}
						className='w-[220px]'
					>
						<ArrowUpDown className='w-4 h-4 ' />
						<b>Sorting:</b>
						<b className='text-primary'>{selectedSort}</b>
					</Button>
				</div>
			</PopoverTrigger>

			<PopoverContent className='w-[220px] p-0'>
				{sortingOptions.map(option => (
					<li
						key={option.value}
						className={cn(
							'list-none hover:bg-secondary hover:text-primary p-2 cursor-pointer',
							selectedSort === option.value && 'bg-secondary text-primary' // Подсветка активного элемента
						)}
						onClick={() => {
							setSelectedSort(option.value)
							setOpen(false)
						}}
					>
						{option.value}
					</li>
				))}
			</PopoverContent>
		</Popover>
	)
}
