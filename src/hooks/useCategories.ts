import { useQuery } from '@tanstack/react-query'

import { categoryService } from '@/services/category.service'

export function useCategories() {
	const { data, isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAll()
	})

	return { categories: data?.data, isLoading }
}
