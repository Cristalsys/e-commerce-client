import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { IListItem } from '@/components/shared/adminPage/admin-list'

import { ADMIN_PAGE } from '@/config/admin-page.config'

import { convertPrice } from '@/lib/convert-price'
import { orderService } from '@/services/order.service'

export function useAdminOrders() {
	const { data: orders, isLoading } = useQuery({
		queryKey: ['get orders for admin dashboard'],
		queryFn: () => orderService.getAll(),
		select: data =>
			data.data.map((order): IListItem => {
				return {
					id: order.id,
					viewUrl: ADMIN_PAGE.SHOW_ORDERS(order.id),
					items: [order.status, order.fullName, convertPrice(order.totalAmount), order.phone]
				}
			})
	})

	return useMemo(
		() => ({
			orders,
			isLoading
		}),
		[orders, isLoading]
	)
}
