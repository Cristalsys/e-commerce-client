'use client'

import React from 'react'

import { useAdminOrders } from '@/hooks/useAdminOrders'

import { AdminList } from '@/components'

interface Props {
	className?: string
}

export const ORders: React.FC<Props> = () => {
	const { orders, isLoading } = useAdminOrders()

	return (
		<AdminList
			listItems={orders || []}
			headerItems={['Status', 'FullName', 'Amount', 'Phone']}
			isLoading={isLoading}
		/>
	)
}
