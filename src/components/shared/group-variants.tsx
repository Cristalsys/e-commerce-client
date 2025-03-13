import React from 'react'

import { Button } from '../ui'

import { cn } from '@/lib/utils'

export type Variant = {
	name: string
	value: string
	disabled?: boolean
}

interface Props {
	items: readonly Variant[]
	onClick?: (value: Variant['value']) => void
	value?: Variant['value']
	className?: string
}

export const GroupVariants: React.FC<Props> = ({ items, onClick, className, value }) => {
	return (
		<div className={cn(className, 'flex gap-x-3 p-1 select-none')}>
			{items.map(item => (
				<Button
					variant={'ghost'}
					key={item.name}
					onClick={() => onClick?.(item.value)}
					className={cn(
						'flex items-center justify-center border hover:border-primary  border-primary rounded-lg cursor-pointer h-[30px] px-5 transition-allduration-400 text-sm',
						{
							'bg-secondary hover:bg-secondary hover:text-primary': item.value === value,
							'opacity-50 cursor-not-allowed': item.disabled
						}
					)}
				>
					{item.name}
				</Button>
			))}
		</div>
	)
}
