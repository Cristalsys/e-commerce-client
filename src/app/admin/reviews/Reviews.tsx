'use client'

import React from 'react'

import { useAdminReviews } from '@/hooks/useAdminReviews'

import { AdminList } from '@/components'

interface Props {
	className?: string
}

export const REviews: React.FC<Props> = () => {
	const { reviews, isLoading, deleteAsync } = useAdminReviews()

	return (
		<AdminList
			listItems={reviews || []}
			headerItems={['Rating', 'Name', 'Date', 'Text']}
			isLoading={isLoading}
			removeHandler={deleteAsync}
		/>
	)
}
