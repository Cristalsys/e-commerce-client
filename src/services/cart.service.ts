import { axiosClassic } from '@/api/axios'

import type { ICartResponse } from '@/types/cart.types'

class CartService {
	private _CART = '/cart'

	getCart() {
		return axiosClassic.get<ICartResponse>(this._CART)
	}

	updateItemQuantity(itemId: string, quantity: number) {
		return axiosClassic.patch<ICartResponse>(`${this._CART}/${itemId}`, { quantity })
	}

	removeCartItem(itemId: string) {
		return axiosClassic.delete<ICartResponse>(`${this._CART}/${itemId}`)
	}

	addCartItem(productItemId: string) {
		return axiosClassic.post<ICartResponse>(this._CART, { productItemId })
	}
}

export const cartService = new CartService()
