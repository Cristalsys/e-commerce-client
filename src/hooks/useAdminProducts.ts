import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type ChangeEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import type { IListItem } from '@/components/shared/adminPage/admin-list'

import { ADMIN_PAGE } from '@/config/admin-page.config'

import { useDebounce } from './useDebounce'
import { productService } from '@/services/product.service'

export function useAdminProducts() {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryClient = useQueryClient()

	const { data: products, isLoading } = useQuery({
		queryKey: ['get products for admin dashboard', debouncedSearch],
		queryFn: () => productService.getAll({ searchTerm: debouncedSearch, perPage: 1000000 }),
		select: data =>
			data.data.products.map(
				(product): IListItem => ({
					id: product.id,
					viewUrl: `/products/${product.id}`,
					editUrl: ADMIN_PAGE.EDIT_PRODUCTS(product.id),
					items: [product.imageUrls[0], product.name, product.category.name]
				})
			)
	})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (productId: string) => productService.delete(productId),
		onSuccess() {
			toast.success('Product is deleted')
			queryClient.invalidateQueries({ queryKey: ['get products for admin dashboard'] })
			queryClient.invalidateQueries({ queryKey: ['products'] })
		},
		onError() {
			toast.error('Error during deleting')
		}
	})

	return useMemo(
		() => ({
			handleSearch,
			searchTerm,
			products,
			isLoading,
			deleteAsync
		}),
		[handleSearch, searchTerm, products, isLoading, deleteAsync]
	)
}
