'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'

import { mapProductSize } from '@/constants/product'

import { convertPrice } from '@/lib/convert-price'
import { cn } from '@/lib/utils'
import { orderService } from '@/services/order.service'
import type { ICartItemResponse } from '@/types/cart.types'
import { EnumOrderStatus } from '@/types/order.types'

interface Props {
	orderId: string
	className?: string
}

export const ORderSHow: React.FC<Props> = ({ orderId }) => {
	const { data: order } = useQuery({
		queryKey: ['order', orderId],
		queryFn: () => orderService.getById(orderId),
		select: ({ data }) => data
	})

	const items = order?.items
		? (JSON.parse(order.items as unknown as string) as ICartItemResponse[])
		: []

	const date = order ? new Date(order.createdAt) : new Date()

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

	return (
		<div className={'flex flex-col gap-4'}>
			<div className='flex gap-2 items-center'>
				<div className='font-semibold'>Status:</div>
				<div
					className={cn('p-3 rounded-full ', {
						' bg-[#1BB486]/20 text-[#1BB486]': order?.status === EnumOrderStatus.SUCCEEDED,
						'bg-[#FF544A]/20 text-[#FF544A]': order?.status === EnumOrderStatus.CANCELLED,
						'bg-[#917C12]/20 text-[#917C12]': order?.status === EnumOrderStatus.PENDING
					})}
				>
					{order?.status}
				</div>
			</div>
			<div>
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
			</div>
			<div className='flex items-center gap-2 border-t border-t-gray-200 pt-4'>
				<div className='font-semibold'>№ order:</div>
				<div>{order?.numberOrder}</div>
			</div>
			<div className='flex gap-2 items-center '>
				<div className='font-semibold'>Total:</div>
				<div>{convertPrice(order?.totalAmount ?? 0)}</div>
			</div>
			<div className='flex items-center gap-2'>
				<div className='font-semibold'>Date:</div>
				<div>{formattedDate}</div>
			</div>
			<div className='flex items-center gap-2'>
				<div className='font-semibold'>Fullname:</div>
				<div>{order?.fullName}</div>
			</div>
			<div className='flex items-center gap-2'>
				<div className='font-semibold'>Email:</div>
				<div>{order?.email}</div>
			</div>
			<div className='flex items-center gap-2'>
				<div className='font-semibold'>Phone:</div>
				<div>{order?.phone}</div>
			</div>
			<div className='flex items-center gap-2'>
				<div className='font-semibold'>Address:</div>
				<div>{order?.address}</div>
			</div>
			{(order?.comment?.length ?? 0) > 0 && (
				<div className='flex items-center gap-2'>
					<div className='font-semibold'>Comment:</div>
					<div>{order?.comment}</div>
				</div>
			)}
		</div>
	)
}
