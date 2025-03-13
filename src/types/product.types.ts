import type { IListItem } from '@/components/shared/adminPage/admin-list'

import { mapProductSize } from './../constants/product'
import type { ICategory } from './category.types'
import type { IPagination } from './pagination.types'
import type { IReview } from './review.types'

export interface IProduct {
	id: string
	name: string
	slug: string
	description: string
	items: IProductItem[]
	reviews: IReview[]
	imageUrls: string[]
	createdAt: string
	category: ICategory
}

export interface IProductCreateData extends Pick<IProduct, 'name' | 'imageUrls' | 'description'> {
	categoryId: string
	items: IProductItemCreate
}

export interface IProductItemCreate {
	price: number
	size: typeof mapProductSize
}

export interface IProductItem {
	id: string
	price: number
	size: number
}

export interface IProductResponse {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	map(arg0: (user: any) => IListItem): any
	products: IProduct[]
	totalPages: number
	totalCount: number
}

export interface IProductDetails {
	product: IProduct
}

export interface IProductsResponse {
	name: string
	price: number
	description?: string
	images: string[]
	categoryId: string
}

export interface IProductsFilters extends IPagination {
	sort?: EnumProductSort
	searchTerm?: string
	sizes?: string
	categories?: string
	priceFrom?: string
	priceTo?: string
}

export enum EnumProductSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest'
}
