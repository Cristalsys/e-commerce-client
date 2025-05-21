import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type ChangeEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import type { IListItem } from '@/components/shared/adminPage/admin-list'

import { ADMIN_PAGE } from '@/config/admin-page.config'

import { useDebounce } from './useDebounce'
import { userService } from '@/services/user.service'

export function useAdminUsers() {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryClient = useQueryClient()

	const { data: users, isLoading } = useQuery({
		queryKey: ['get users for admin dashboard', debouncedSearch],
		queryFn: () => userService.getAll(debouncedSearch),
		select: data =>
			data.data.map(
				(user): IListItem => ({
					id: user.id,
					editUrl: ADMIN_PAGE.EDIT_USER(user.id),
					items: [
						user.name,
						user.email.length > 18 ? user.email.slice(0, 18) + '...' : user.email,
						user.role
					]
				})
			)
	})

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (userId: string) => userService.delete(userId),
		onSuccess() {
			toast.success('User is deleted')
			queryClient.invalidateQueries({
				queryKey: ['get users for admin dashboard']
			})
		},
		onError() {
			toast.error('Error during deleting')
		}
	})

	return useMemo(
		() => ({
			handleSearch,
			searchTerm,
			users,
			isLoading,
			deleteAsync
		}),
		[handleSearch, searchTerm, users, isLoading, deleteAsync]
	)
}
