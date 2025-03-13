import type { CheckoutFormValues } from '@/utils/schemas/checkout/schema'

import { instance } from '@/api/axios'

import type { IOrder } from '@/types/order.types'

class OrderService {
	private _ORDERS = '/orders'

	getAll() {
		return instance.get<IOrder[]>(this._ORDERS)
	}

	getById(id: string) {
		return instance.get<IOrder>(`${this._ORDERS}/${id}`)
	}

	getOrdersByUserId() {
		return instance.get<IOrder[]>(`${this._ORDERS}/by-user`)
	}

	сreateOrder(data: CheckoutFormValues) {
		return instance.post<{ url: { url: string } }>(`${this._ORDERS}/createOrder`, data)
	}
}

export const orderService = new OrderService()
