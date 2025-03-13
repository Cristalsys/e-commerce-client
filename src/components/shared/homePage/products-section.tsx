'use client'

import React from 'react'

import { useProducts } from '@/hooks/useProducts'

import { Container } from '../container'
import { ProductCard } from '../product-card'
import { Title } from '../title'

import { Section } from './section'

export const ProductsSection: React.FC = () => {
	const { products: productsItem } = useProducts()

	return (
		<Section>
			<Container>
				<Title
					size='lg'
					className='text-center font-semibold mb-6'
				>
					Check out our <br /> products
				</Title>
				<p className='text-center px-[12rem] max-md:px-[0rem]'>
					Here are some selected plants from our showroom, all are in excellent shape and has a long
					life span. Buy and enjoy best quality.
				</p>
				<div className='grid grid-cols-3 gap-[50px] py-12 relative px-[84px] max-lg:grid-cols-2 max-md:px-[0px] max-sm:grid-cols-1'>
					{productsItem?.products.map(product => (
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
					))}
				</div>
			</Container>
		</Section>
	)
}
