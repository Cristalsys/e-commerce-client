import type { IProduct, IProductItem } from './product.types'

export type ICartItemResponse = ICartItem & {
	productItem: IProductItem & {
		product: IProduct
	}
}

export interface ICart {
	id: string
	userId?: string
	token: string
	totalAmount: number
}

export interface ICartResponse extends ICart {
	items: ICartItemResponse
}

export interface ICartItem {
	id: string
	cartId: string
	quantity: number
	price: number
}

export interface CartItemProps {
	id: string
	imageUrls: string[]
	details: string
	name: string
	price: number
	quantity: number
	disabled?: boolean
}
