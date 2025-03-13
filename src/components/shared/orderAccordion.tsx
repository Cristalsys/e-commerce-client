import Image from 'next/image'
import React from 'react'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion'

import { mapProductSize } from '@/constants/product'

import { convertPrice } from '@/lib/convert-price'
import { cn } from '@/lib/utils'
import type { ICartItemResponse } from '@/types/cart.types'
import { EnumOrderStatus, type IOrder } from '@/types/order.types'

interface Props {
	className?: string
	item: IOrder
	openItem: string | undefined
}

export const OrderACcordion: React.FC<Props> = ({ className, item }) => {
	const date = new Date(item.createdAt)

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

	// const items = item.items as ICartItemResponse[]
	const items = JSON.parse(item?.items as unknown as string) as ICartItemResponse[]

	return (
		<div className={className}>
			<AccordionItem
				value={`item-${item.id}`}
				className='border border-gray-400 px-4 rounded-lg'
			>
				<AccordionTrigger className='hover:no-underline'>
					<div className='flex items-center justify-between w-full  '>
						<div className='flex items-center gap-8'>
							<div className='font-bold'>Order # {item.numberOrder}</div>
							<div className='text-gray-400'>{formattedDate}</div>
						</div>
						<div
							className={cn('p-3 rounded-full mr-8', {
								' bg-[#1BB486]/20 text-[#1BB486]': item.status === EnumOrderStatus.SUCCEEDED,
								'bg-[#FF544A]/20 text-[#FF544A]': item.status === EnumOrderStatus.CANCELLED,
								'bg-[#917C12]/20 text-[#917C12]': item.status === EnumOrderStatus.PENDING
							})}
						>
							{item.status}
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent className='border-none'>
					{Array.isArray(items) &&
						items.length > 0 &&
						items.map(cartItem => (
							<div key={cartItem.id}>
								<div className='flex justify-between items-center py-4 border-t border-t-gray-200 '>
									<div className='flex items-center gap-4'>
										<Image
											alt={cartItem.productItem.product.name}
											width={50}
											height={50}
											src={cartItem.productItem.product.imageUrls[0]}
										/>
										<div className='flex flex-col gap-y-1'>
											<div className='font-bold'>{cartItem.productItem.product.name}</div>
											{/* details={mapProductSize[item.pizzaSize as keyof typeof mapProductSize]} */}
											<div className='text-gray-400'>
												{mapProductSize[cartItem.productItem.size as keyof typeof mapProductSize]}
											</div>
										</div>
									</div>
									<div className='flex flex-col gap-y-1'>
										<div className='font-bold'>{convertPrice(cartItem.productItem.price)}</div>
										<div className='text-gray-400'>{cartItem.quantity + ' pcs.'} </div>
									</div>
								</div>
							</div>
						))}
					<div className='py-4 border-t border-gray-200'>
						Total: <b>{convertPrice(item.totalAmount)}</b>
					</div>
				</AccordionContent>
			</AccordionItem>
		</div>
	)
}
