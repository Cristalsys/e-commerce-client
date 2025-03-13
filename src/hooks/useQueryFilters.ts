import { useRouter } from 'next/navigation'
import qs from 'qs'
import React from 'react'

import type { Filters } from './useFilters'

export const useQueryFilters = (filters: Filters) => {
	const isMounted = React.useRef(false)
	const router = useRouter()

	React.useEffect(() => {
		const currentQuery = qs.parse(window.location.search, { ignoreQueryPrefix: true })

		// Сохраняем текущую страницу из URL (или 1, если её нет)
		const currentPage = currentQuery.page || '1'

		// Сравниваем старые и новые фильтры
		const prevCategories = currentQuery.categories || ''
		const newCategories = Array.from(filters.selectedCategories)
		const categoriesChanged =
			JSON.stringify(prevCategories) !== JSON.stringify(newCategories.join(','))

		const prevSizes = currentQuery.sizes || ''
		const newSizes = Array.from(filters.sizes)
		const sizesChanged = JSON.stringify(prevSizes) !== JSON.stringify(newSizes.join(','))

		const prevRatings = currentQuery.ratings || ''
		const newRatings = Array.from(filters.ratings)
		const ratingsChanged = JSON.stringify(prevRatings) !== JSON.stringify(newRatings.join(','))

		// Обновляем параметры фильтров и сбрасываем страницу на 1 только если фильтры изменились
		const params = {
			...currentQuery,
			...filters.prices,
			page: categoriesChanged || sizesChanged || ratingsChanged ? '1' : currentPage, // Сбрасываем страницу только при изменении фильтров
			sizes: newSizes,
			ratings: newRatings,
			categories: newCategories
		}

		const query = qs.stringify(params, { arrayFormat: 'comma' })

		// Обновляем URL
		if (isMounted.current) {
			router.push(`?${query}`, { scroll: false })
		}

		isMounted.current = true
	}, [filters, router]) // Следим за изменениями фильтров
}
