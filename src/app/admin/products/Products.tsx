'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import AdminHeader from '@/components/shared/adminPage/admin-header'

import { useAdminProducts } from '@/hooks/useAdminProducts'

import { AdminList } from '@/components'

interface Props {
	className?: string
}

export const PRoducts: React.FC<Props> = () => {
	const { products, searchTerm, handleSearch, isLoading, deleteAsync } = useAdminProducts()
	const router = useRouter()

	return (
		<div>
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={() => router.push('products/create')}
			/>
			<AdminList
				listItems={products || []}
				headerItems={['Image', 'Name', 'Category']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}
