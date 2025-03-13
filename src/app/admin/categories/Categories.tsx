'use client'

import React from 'react'

import AdminHeader from '@/components/shared/adminPage/admin-header'

import { useAdminCategories } from '@/hooks/useAdminCategories'

import { AdminList } from '@/components'

interface Props {
	className?: string
}

export const CAtegories: React.FC<Props> = ({ className }) => {
	const { handleSearch, searchTerm, genres, isLoading, createAsync, deleteAsync } =
		useAdminCategories()

	return (
		<div className={className}>
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminList
				listItems={genres || []}
				headerItems={['Name']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}
