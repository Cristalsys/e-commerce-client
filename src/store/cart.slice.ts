import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { type CartStateItem, getCartDetails } from '@/lib/get-cart-details'
import { cartService } from '@/services/cart.service'

interface CartState {
	loading: boolean
	error: boolean
	totalAmount: number
	items: CartStateItem[]
}

const initialState: CartState = {
	items: [],
	error: false,
	loading: false,
	totalAmount: 0
}

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
	const data = await cartService.getCart()
	return getCartDetails(data.data)
})

export const updateItemQuantity = createAsyncThunk(
	'cart/updateItemQuantity',
	async ({ id, quantity }: { id: string; quantity: number }) => {
		const data = await cartService.updateItemQuantity(id, quantity)
		return getCartDetails(data.data)
	}
)

export const addCartItem = createAsyncThunk('cart/addCartItem', async (productItemId: string) => {
	const data = await cartService.addCartItem(productItemId)
	return getCartDetails(data.data)
})

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id: string) => {
	const data = await cartService.removeCartItem(id)
	// fetchCartItems()
	return getCartDetails(data.data)
})

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCartItems.pending, state => {
				state.loading = true
				state.error = false
			})
			.addCase(fetchCartItems.fulfilled, (state, action) => {
				state.loading = false
				Object.assign(state, action.payload)
			})
			.addCase(fetchCartItems.rejected, state => {
				state.loading = false
				state.error = true
			})

			.addCase(updateItemQuantity.pending, state => {
				state.loading = true
				state.error = false
			})
			.addCase(updateItemQuantity.fulfilled, (state, action) => {
				state.loading = false
				Object.assign(state, action.payload)
			})
			.addCase(updateItemQuantity.rejected, state => {
				state.loading = false
				state.error = true
			})

			.addCase(addCartItem.pending, state => {
				state.loading = true
				state.error = false
			})
			.addCase(addCartItem.fulfilled, (state, action) => {
				state.loading = false
				Object.assign(state, action.payload)
			})
			.addCase(addCartItem.rejected, state => {
				state.loading = false
				state.error = true
			})

			.addCase(removeCartItem.pending, (state, action) => {
				state.loading = true
				state.error = false
				state.items = state.items.map(item =>
					item.id === action.meta.arg ? { ...item, disabled: true } : item
				)
			})
			.addCase(removeCartItem.fulfilled, (state, action) => {
				state.loading = false
				Object.assign(state, action.payload)
			})
			.addCase(removeCartItem.rejected, state => {
				state.loading = false
				state.error = true
				state.items = state.items.map(item => ({ ...item, disabled: false }))
			})
	}
})
