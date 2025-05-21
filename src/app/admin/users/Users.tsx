'use client'

import React from 'react'

import AdminHeader from '@/components/shared/adminPage/admin-header'

import { useAdminUsers } from '@/hooks/useAdminUsers'

import { AdminList } from '@/components'

interface Props {
	className?: string
}

export const Users: React.FC<Props> = () => {
	const { handleSearch, searchTerm, users, isLoading, deleteAsync } = useAdminUsers()

	return (
		<div>
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
			/>
			<AdminList
				listItems={users || []}
				headerItems={['Name', 'Email', 'Role']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}
