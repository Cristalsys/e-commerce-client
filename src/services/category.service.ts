import { axiosClassic, instance } from '@/api/axios'

import type { ICategory, ICategoryEditInput } from '@/types/category.types'

class CategoryService {
	private _CATEGORIES = '/categories'

	getAll(searchTerm?: string) {
		return axiosClassic.get<ICategory[]>(this._CATEGORIES, {
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	}

	getById(id: string) {
		return instance.get<ICategory>(`${this._CATEGORIES}/${id}`)
	}

	bySlug(slug: string) {
		return instance.get<ICategory>(`${this._CATEGORIES}/by-slug/${slug}`)
	}

	create() {
		return instance.post<string>(this._CATEGORIES)
	}

	update(id: string, data: ICategoryEditInput) {
		return instance.put<ICategory>(`${this._CATEGORIES}/${id}`, data)
	}

	delete(id: string) {
		return instance.delete<ICategory>(`${this._CATEGORIES}/${id}`)
	}
}

export const categoryService = new CategoryService()
