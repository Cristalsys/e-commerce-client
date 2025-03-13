import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { TFormProductValues } from '@/utils/schemas/products/schema'

import { productService } from '@/services/product.service'

export function useAdminProductCreate() {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create product'],
		mutationFn: (data: TFormProductValues) => productService.create(data),
		onSuccess() {
			toast.success('Product is created')
			queryClient.invalidateQueries({ queryKey: ['get products for admin dashboard'] })
			queryClient.invalidateQueries({ queryKey: ['products'] })
		},
		onError() {
			toast.error('Error during creating')
		}
	})

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onSubmit: SubmitHandler<TFormProductValues> = async data => {
		router.push('/admin/products')
		await createAsync(data)
	}

	return useMemo(
		() => ({
			onSubmit
		}),
		[onSubmit]
	)
}
