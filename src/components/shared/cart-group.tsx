import React from 'react'

import { mapProductSize } from '@/constants/product'

import { CartItem } from './cart-item'
import type { CartStateItem } from '@/lib/get-cart-details'

interface Props {
	items: CartStateItem[]
	onClickCountButton: (id: string, quantity: number, type: 'plus' | 'minus') => void
	removeCartItem: (id: string) => void
	loading?: boolean
	hasSum?: boolean
	className?: string
}
export const CartGroup: React.FC<Props> = ({
	className,
	items,
	hasSum = true,
	onClickCountButton,
	removeCartItem,
	loading
}) => {
	return (
		<div className={className}>
			{loading
				? [...Array(items.length)].map((_, index) => (
						<div
							key={index}
							className={'flex items-center justify-between'}
						>
							<div className='flex items-center gap-5 flex-1'>
								<div className='w-[50px] h-[67px] bg-gray-200 rounded-full animate-pulse' />
								<h2 className='w-40 h-5 bg-gray-200 rounded animate-pulse' />
							</div>
							<div className='flex items-center justify-between w-1/2'>
								<div className='h-5 w-20 bg-gray-200 rounded animate-pulse' />
								<div className='h-5 w-20 bg-gray-200 rounded animate-pulse' />
								{hasSum && (
									<div className='h-5 w-20 bg-gray-200 rounded animate-pulse max-md:hidden' />
								)}
								<div className='h-5 w-5 bg-gray-200 rounded animate-pulse' />
							</div>
						</div>
					))
				: items.map(item => (
						<CartItem
							key={item.id}
							hasSum={hasSum}
							id={item.id}
							imageUrls={item.imageUrls}
							details={mapProductSize[item.pizzaSize as keyof typeof mapProductSize]}
							name={item.name}
							price={item.price}
							quantity={item.quantity}
							disabled={item.disabled}
							onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
							onClickRemove={() => removeCartItem(item.id)}
						/>
					))}
		</div>
	)
}
