import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import type { IListItem } from '@/components/shared/adminPage/admin-list'

import { ADMIN_PAGE } from '@/config/admin-page.config'

import { useDebounce } from './useDebounce'
import { categoryService } from '@/services/category.service'

export function useAdminCategories() {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryClient = useQueryClient()

	const { data: categories, isLoading } = useQuery({
		queryKey: ['get categories for admin dashboard', debouncedSearch],
		queryFn: () => categoryService.getAll(debouncedSearch),
		select: data =>
			data.data.map(
				(category): IListItem => ({
					id: category.id,
					editUrl: ADMIN_PAGE.EDIT_CATEGORY(category.id),
					items: [category.name]
				})
			)
	})

	const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}, [])

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create category'],
		mutationFn: () => categoryService.create(),
		onSuccess({ data: id }) {
			toast.success('Category created')
			push(ADMIN_PAGE.EDIT_CATEGORY(id))
			queryClient.invalidateQueries({
				queryKey: ['get categories for admin dashboard']
			})
		},
		onError() {
			toast.error('Error during created')
		}
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (categoryId: string) => categoryService.delete(categoryId),
		onSuccess() {
			toast.success('Category deleted')
			queryClient.invalidateQueries({
				queryKey: ['get categories for admin dashboard']
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
			genres: categories,
			isLoading,
			createAsync,
			deleteAsync
		}),
		[handleSearch, searchTerm, categories, isLoading, createAsync, deleteAsync]
	)
}
