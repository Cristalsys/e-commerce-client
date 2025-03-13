import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Button } from '../ui'

import { CartGroup } from './cart-group'
import { Title } from './title'
import { convertPrice } from '@/lib/convert-price'
import type { CartStateItem } from '@/lib/get-cart-details'

interface Props {
	items: CartStateItem[]
	onClickCountButton: (id: string, quantity: number, type: 'plus' | 'minus') => void
	removeCartItem: (id: string) => void
	loading?: boolean
	totalAmount: number
	className?: string
}

export const Cart: React.FC<Props> = ({
	items,
	onClickCountButton,
	removeCartItem,
	loading,
	className,
	totalAmount
}) => {
	return (
		<div className={className}>
			{totalAmount > 0 && (
				<>
					<Title
						size='lg'
						className='mb-8 text-center'
					>
						You added to cart
					</Title>
					<div className='flex flex-col'>
						<div className='flex items-center justify-between border-b border-t pt-2 pb-2 text-gray-500 text-sm font-medium'>
							<div className='flex-1'>Name</div>
							<div className='flex items-center justify-between w-1/2'>
								<span className='text-left w-[100px]'>Price</span>
								<span className='text-left w-[100px]'>Quantity</span>
								<span className='text-left w-[100px] max-md:hidden'>Sum</span>
								<span className='text-left w-[50px]'></span>
							</div>
						</div>
						<CartGroup
							items={items}
							loading={loading}
							onClickCountButton={onClickCountButton}
							removeCartItem={removeCartItem}
						/>
						<div className='flex justify-between mt-6'>
							<div>
								<b>{items.length}</b> items for the amount of:
							</div>
							<div className='flex gap-2 items-center font-semibold bg-secondary p-4 rounded-md border border-primary'>
								{convertPrice(totalAmount)}
								<Link href={'/checkout'}>
									<Button>place order</Button>
								</Link>
							</div>
						</div>
					</div>
				</>
			)}
			{!totalAmount && (
				<div className='flex flex-col items-center justify-center text-center'>
					<Title
						size='lg'
						className='m-4'
					>
						Cart is empty <span>😕</span>
					</Title>
					<p>
						Most likely, you have not ordered a plant yet.
						<br />
						To order a plant, go to the main page.
					</p>
					<Image
						src={'/images/empty-cart.png'}
						alt='cart is empty'
						width={300}
						height={300}
					/>
				</div>
			)}
		</div>
	)
}
