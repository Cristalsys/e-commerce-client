'use client'

import React from 'react'
import { useDispatch } from 'react-redux'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

import { removeCartItem, updateItemQuantity } from '@/store/cart.slice'

import { useCart } from '@/hooks/useCart'

import { Cart } from './cart'
import { type TAppDispatch } from '@/store'

interface Props {
	className?: string
}

export const CartDialog: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
	const { items, loading, totalAmount } = useCart()
	const dispatch = useDispatch<TAppDispatch>()

	const onClickCountButton = (id: string, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		dispatch(updateItemQuantity({ id, quantity: newQuantity }))
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='max-w-full h-full flex flex-col overflow-auto'>
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>
				<Cart
					className='mx-40 max-lg:mx-6'
					items={items}
					loading={loading}
					totalAmount={totalAmount}
					onClickCountButton={onClickCountButton}
					removeCartItem={(id: string) => dispatch(removeCartItem(id))}
				/>
			</DialogContent>
		</Dialog>
	)
}
