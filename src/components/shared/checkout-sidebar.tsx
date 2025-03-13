'use client'

import { Separator } from '@radix-ui/react-separator'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Package, Truck, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { Skeleton } from '@/ui/skeleton'

import { Button, Input } from '../ui'

import { CheckoutItemDetails } from './checkout-item-details'
import { WhiteBlock } from './white-block'
import { convertPrice } from '@/lib/convert-price'
import { cn } from '@/lib/utils'
import { promocodeService } from '@/services/promode.service'

let DELIVERY_PRICE = 10

interface Props {
	totalAmount: number
	loading?: boolean
	className?: string
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
	const [code, setCode] = useState('')
	const [discount, setDiscount] = useState(0)
	const [discountPercentage, setDiscountPercentage] = useState(0)
	const [total, setTotal] = useState(totalAmount)

	if (totalAmount === 0) DELIVERY_PRICE = 0
	const totalPrice = total + DELIVERY_PRICE

	const { mutate, isPending } = useMutation({
		mutationKey: ['apply promo-code'],
		mutationFn: ({ code, cartTotal }: { code: string; cartTotal: number }) =>
			promocodeService.applyPromocode(code, cartTotal),
		onSuccess(data) {
			setDiscount(data.data.discount)
			setDiscountPercentage(data.data.discountPercentage)
			setTotal(data.data.totalWithDiscount)
		},
		onError() {
			toast.error("promo-code doesn't exist")
			setDiscount(0)
			setDiscountPercentage(0)
			setTotal(totalAmount)
		}
	})

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		mutate({ code, cartTotal: totalAmount })
	}

	return (
		<WhiteBlock className={cn('p-2 sticky top-4', className)}>
			<div>
				<div className='flex gap-4 items-center mb-6'>
					<Input
						type='text'
						value={code}
						onChange={e => setCode(e.target.value)}
						placeholder='Enter promo-code'
					/>
					<Button
						loading={isPending}
						onClick={handleClick}
					>
						Apply
					</Button>
				</div>
				{discount > 0 && (
					<p className='-mt-4 text-xs'>
						Discount: - {discountPercentage + '%'} - <b>{convertPrice(discount)}</b>
					</p>
				)}
			</div>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Package
							size={18}
							className='mr-2 text-gray-400'
						/>
						Cart price:
					</div>
				}
				value={loading ? <Skeleton className='h-6 w-16 rounded-[6px]' /> : `${convertPrice(total)}`}
			/>

			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Truck
							size={18}
							className='mr-2 text-gray-400'
						/>
						Delivery:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-6 w-16 rounded-[6px]' />
					) : (
						`${convertPrice(DELIVERY_PRICE)}`
					)
				}
			/>
			<Separator />
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Wallet
							size={18}
							className='mr-2 text-gray-400'
						/>
						Total:
					</div>
				}
				value={
					loading ? <Skeleton className='h-6 w-16 rounded-[6px]' /> : `${convertPrice(totalPrice)}`
				}
			/>

			<Button
				loading={loading}
				type='submit'
				className='w-full h-12 rounded-lg mt-6 text-base font-bold'
			>
				Proceed to payment
				<ArrowRight className='w-5 ml-2' />
			</Button>
		</WhiteBlock>
	)
}
