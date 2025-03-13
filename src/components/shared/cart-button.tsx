'use client'

import { ArrowRight, ShoppingCart } from 'lucide-react'
import React from 'react'

import { useCart } from '@/hooks/useCart'

import { Button } from '../ui'

import { CartDialog } from './cart-dialog'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const CartButton: React.FC<Props> = ({ className }) => {
	const { items, loading, totalAmount } = useCart()

	return (
		<CartDialog>
			<Button
				loading={loading}
				className={cn('group relative', { 'w-[105px]': loading }, className)}
			>
				<b>{totalAmount ?? '0'} $</b>
				<span className='h-full w-[1px] bg-white/30 mx-3' />
				<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart
						size={16}
						className='relative'
						strokeWidth={2}
					/>
					<b>{items.length}</b>
				</div>
				<ArrowRight
					size={20}
					className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
				/>
			</Button>
		</CartDialog>
	)
}
