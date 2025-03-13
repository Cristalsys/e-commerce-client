import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { categoryService } from '@/services/category.service'
import type { ICategoryEditInput } from '@/types/category.types'

export function useCategoryEdit(categoryId: string) {
	const { data: category, isLoading } = useQuery({
		queryKey: ['category', categoryId],
		queryFn: () => categoryService.getById(categoryId),
		select: ({ data }) => data,
		enabled: !!categoryId
	})

	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['update category'],
		mutationFn: (data: ICategoryEditInput) => categoryService.update(categoryId, data),
		onSuccess() {
			toast.success('Category is updated')
			router.push('/admin/categories')
			queryClient.invalidateQueries({
				queryKey: ['get categories for admin dashboard']
			})
		},
		onError() {
			toast.error('Error during updating')
		}
	})

	const onSubmit: SubmitHandler<ICategoryEditInput> = async data => {
		await mutateAsync(data)
	}

	return { category, onSubmit, isLoading }
}
