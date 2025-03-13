'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

import { Skeleton } from '@/ui/skeleton'

import { useProducts } from '@/hooks/useProducts'

import { Separator } from '../ui'

import { PaginationProducts } from './pagination-products'
import { ProductCard } from './product-card'
import { cn } from '@/lib/utils'
import type { EnumProductSort } from '@/types/product.types'

export interface GetSearchParams {
	perPage?: number
	page?: number
	sort?: EnumProductSort
	sizes?: string
	ratings?: string
	categories?: string
	priceFrom?: string
	priceTo?: string
}

interface Props {
	className?: string
}

export const ProductsGroupList: React.FC<Props> = ({ className }) => {
	const searchParams = useSearchParams()

	const params: GetSearchParams = {
		page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
		perPage: searchParams.get('perPage') ? Number(searchParams.get('perPage')) : undefined,
		sizes: searchParams.get('sizes') || undefined,
		ratings: searchParams.get('ratings') || undefined,
		sort: (searchParams.get('sort') as EnumProductSort) || undefined,
		categories: searchParams.get('categories') || undefined,
		priceFrom: searchParams.get('priceFrom') || undefined,
		priceTo: searchParams.get('priceTo') || undefined
	}

	const { products: productsItem, totalPages, isLoading } = useProducts(params)

	return (
		<div className={className}>
			<div className={cn('grid grid-cols-3 gap-[50px] max-lg:grid-cols-2')}>
				{isLoading ? (
					<>
						{...Array(params.perPage || 6)
							.fill(0)
							.map((_, index) => (
								<div key={index}>
									<Skeleton className='h-48 mb-4 rounded-[8px]' />
									<Skeleton className='h-8 mb-2 rounded-[8px]' />
									<Skeleton className='h-8 mb-2 rounded-[8px]' />
								</div>
							))}
					</>
				) : Array.isArray(productsItem?.products) && productsItem.products.length > 0 ? (
					productsItem.products.map(product => (
						<ProductCard
							key={product.id}
							id={product.id}
							description={product.description}
							name={product.name}
							imageUrls={product.imageUrls}
							reviews={product.reviews}
							price={product.items?.[0]?.price}
							items={product.items}
						/>
					))
				) : (
					<div>No products found</div>
				)}
			</div>
			<Separator className='mt-12' />
			<div className='mt-6'>
				<PaginationProducts
					className='justify-start'
					totalPages={totalPages?.toString() || '0'}
				/>
			</div>
		</div>
	)
}
