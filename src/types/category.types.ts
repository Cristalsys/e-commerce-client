import type { IProduct } from './product.types'

export interface ICategory {
	id: string
	name: string
	slug: string
	products: IProduct[]
}

export type ICategoryEditInput = Omit<ICategory, 'id' | 'products' | 'slug'>
