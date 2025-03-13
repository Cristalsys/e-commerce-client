'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import AdminHeader from '@/components/shared/adminPage/admin-header'

import { useAdminPromocode } from '@/hooks/useAdminPromocode'

import { AdminList } from '@/components'

interface Props {
	className?: string
}

export const PRomocode: React.FC<Props> = () => {
	const { handleSearch, searchTerm, promocodes, isLoading, deleteAsync } = useAdminPromocode()
	const router = useRouter()

	return (
		<div>
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={() => router.push('promocode/create')}
			/>

			<AdminList
				listItems={promocodes || []}
				headerItems={['Code', 'Discount', 'Expired']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}
