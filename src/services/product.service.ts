import type { TFormProductValues } from '@/utils/schemas/products/schema'

import { axiosClassic, instance } from '@/api/axios'

import type { IProduct, IProductResponse, IProductsFilters } from '@/types/product.types'

class ProductService {
	private _PRODUCTS = '/products'

	async getAll(queryData = {} as IProductsFilters) {
		const data = await axiosClassic.get<IProductResponse>(this._PRODUCTS, {
			params: queryData
		})

		return data
	}

	getSimilar(id: string) {
		return axiosClassic.get<IProduct[]>(`${this._PRODUCTS}/similar/${id}`)
	}

	getBySlug(slug: string) {
		return axiosClassic.get<IProduct>(`${this._PRODUCTS}/by-slug/${slug}`)
	}

	getById(id: string) {
		return instance.get<IProduct>(`${this._PRODUCTS}/${id}`)
	}

	getByCategory(categorySlug: string) {
		return axiosClassic.get<IProduct>(`${this._PRODUCTS}/by-category/${categorySlug}`)
	}

	create(data: TFormProductValues) {
		return instance.post<IProduct>(this._PRODUCTS, data)
	}

	update(id: string, data: TFormProductValues) {
		return instance.put<IProduct>(`${this._PRODUCTS}/${id}`, data)
	}

	delete(id: string) {
		return instance.delete<IProduct>(`${this._PRODUCTS}/${id}`)
	}
}

export const productService = new ProductService()
