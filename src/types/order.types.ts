import type { ICartItem } from './cart.types'
import type { IUser } from './user.types'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	CANCELLED = 'CANCELLED',
	SUCCEEDED = 'SUCCEEDED'
}

export interface IOrder {
	id: string
	numberOrder: number
	createdAt: string
	items: ICartItem[]
	user: IUser
	status: EnumOrderStatus
	totalAmount: number
	fullName: string
	email: string
	phone: string
	address: string
	comment?: string
}
