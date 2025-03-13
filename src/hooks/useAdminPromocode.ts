import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type ChangeEvent, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import type { IListItem } from '@/components/shared/adminPage/admin-list'

import { useDebounce } from './useDebounce'
import { promocodeService } from '@/services/promode.service'

export function useAdminPromocode() {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryClient = useQueryClient()

	const { data: promocodes, isLoading } = useQuery({
		queryKey: ['get promocode for admin dashboard', debouncedSearch],
		queryFn: () => promocodeService.getAll(debouncedSearch),
		select: data =>
			data.data.map(
				(promocode): IListItem => ({
					id: promocode.id,
					items: [
						promocode.code,
						promocode.discount,
						new Intl.DateTimeFormat('en-GB', {
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						}).format(new Date(promocode.expiresAt))
					]
				})
			)
	})

	const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}, [])

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete promocode'],
		mutationFn: (promocodeId: string) => promocodeService.delete(promocodeId),
		onSuccess() {
			toast.success('Promocode deleted')
			queryClient.invalidateQueries({
				queryKey: ['get promocode for admin dashboard']
			})
		},
		onError() {
			toast.error('Error during deleting')
		}
	})

	return useMemo(
		() => ({
			promocodes,
			handleSearch,
			searchTerm,
			isLoading,
			deleteAsync
		}),
		[promocodes, isLoading, deleteAsync, handleSearch, searchTerm]
	)
}
