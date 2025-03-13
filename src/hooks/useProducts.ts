import { useQuery } from '@tanstack/react-query'

import type { GetSearchParams } from '@/components/shared/products-group-list'

import { productService } from '@/services/product.service'

export function useProducts(searchParams?: GetSearchParams) {
	const { data, isLoading } = useQuery({
		queryKey: ['products', searchParams],
		queryFn: () => productService.getAll(searchParams)
	})

	return {
		products: data?.data,
		totalPages: data?.data.totalPages,
		isLoading
	}
}
