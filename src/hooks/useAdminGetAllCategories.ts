import { useQuery } from '@tanstack/react-query'

import { categoryService } from '@/services/category.service'
import type { IOption } from '@/types/form.types'

export function useAdminGetAllCategories() {
	const { data: categories, isLoading: isCategoriesLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAll(),
		select: data =>
			data.data.map(
				(category): IOption => ({
					label: category.name,
					value: category.id
				})
			)
	})

	return { categories, isCategoriesLoading }
}
