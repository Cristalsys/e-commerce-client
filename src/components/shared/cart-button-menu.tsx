'use client'

import { ShoppingCart } from 'lucide-react'
import React from 'react'

import { Button } from '../ui'

import { CartDialog } from './cart-dialog'
import { cn } from '@/lib/utils'
import { useTypedSelector } from '@/store'

interface Props {
	className?: string
}

export const CartButtonMenu: React.FC<Props> = ({ className }) => {
	const { items } = useTypedSelector(state => state.cart)

	return (
		<div className={className}>
			<CartDialog>
				<Button
					variant={'ghost'}
					className={cn('relative flex items-center justify-center h-9 w-9', className)}
				>
					<ShoppingCart className='!size-6' />
					<span className='absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full'>
						{items.length}
					</span>
				</Button>
			</CartDialog>
		</div>
	)
}
