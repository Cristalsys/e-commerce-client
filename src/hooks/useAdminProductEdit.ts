import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { TFormProductValues } from '@/utils/schemas/products/schema'

import { productService } from '@/services/product.service'

export function useAdminProductEdit(productId: string) {
	const { data: product, isLoading: isProductLoading } = useQuery({
		queryKey: ['product', productId],
		queryFn: () => productService.getById(productId),
		select: ({ data }) => data,
		enabled: !!productId
	})

	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['update product'],
		mutationFn: (data: TFormProductValues) => productService.update(productId, data),
		onSuccess() {
			toast.success('Product is updated')
			queryClient.invalidateQueries({ queryKey: ['get products for admin dashboard'] })
			queryClient.invalidateQueries({ queryKey: ['products'] })
		},
		onError() {
			toast.error('Error during updating')
		}
	})

	const onSubmit = useCallback<SubmitHandler<TFormProductValues>>(
		async data => {
			router.push('/admin/products')
			await mutateAsync(data)
		},
		[router, mutateAsync]
	)

	return useMemo(
		() => ({
			onSubmit,
			product,
			isProductLoading
		}),
		[onSubmit, product, isProductLoading]
	)
}
