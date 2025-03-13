import type { ICartResponse } from '@/types/cart.types'

export type CartStateItem = {
	id: string
	quantity: number
	name: string
	imageUrls: string[]
	price: number
	disabled?: boolean
	pizzaSize?: number | null
}

interface ReturnProps {
	items: CartStateItem[]
	totalAmount: number
}

export const getCartDetails = (data: ICartResponse): ReturnProps => {
	const items = Array.isArray(data.items)
		? (data.items.map(item => ({
				id: item.id,
				quantity: item.quantity,
				name: item.productItem.product.name,
				imageUrls: item.productItem.product.imageUrls,
				price: item.productItem.price,
				pizzaSize: item.productItem.size,
				disabled: false
			})) as CartStateItem[])
		: []

	return {
		items,
		totalAmount: data.totalAmount
	}
}
