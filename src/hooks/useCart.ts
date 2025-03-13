import React from 'react'
import { useDispatch } from 'react-redux'

import { fetchCartItems } from '@/store/cart.slice'

import type { CartStateItem } from '@/lib/get-cart-details'
import { type TAppDispatch, useTypedSelector } from '@/store'

type ReturnProps = {
	totalAmount: number
	items: CartStateItem[]
	loading: boolean
}

export const useCart = (): ReturnProps => {
	const cartState = useTypedSelector(state => state.cart)
	const dispatch = useDispatch<TAppDispatch>()

	React.useEffect(() => {
		dispatch(fetchCartItems())
	}, [dispatch])

	return cartState
}
