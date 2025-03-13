'use client'

import React from 'react'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/ui/carousel'

import { useProducts } from '@/hooks/useProducts'

import { ProductCard } from './product-card'
import { Title } from './title'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const SimilarProduct: React.FC<Props> = ({ className }) => {
	const { products } = useProducts()

	return (
		<div className={cn('w-full', className)}>
			<Title
				size='md'
				className='font-semibold'
			>
				You may also be interested in
			</Title>
			<div className='mt-8 w-full'>
				<Carousel className='w-full relative'>
					<CarouselContent className='flex w-full'>
						{Array.isArray(products?.products) &&
							products.products.length > 0 &&
							products.products.slice(0, 10).map(product => (
								<CarouselItem
									key={product.id}
									className='basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 snap-start'
								>
									<div className='p-2'>
										<ProductCard
											id={product.id}
											description={product.description}
											name={product.name}
											imageUrls={product.imageUrls}
											reviews={product.reviews}
											price={product.items?.[0]?.price}
											items={product.items}
										/>
									</div>
								</CarouselItem>
							))}
					</CarouselContent>
					<CarouselPrevious className='absolute left-0 w-10 h-10' />
					<CarouselNext className='absolute right-0  w-10 h-10' />
				</Carousel>
			</div>
		</div>
	)
}
