'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'

import { SingleProduct } from './SingleProduct'
import { productService } from '@/services/product.service'

export default function ProductPage() {
	const { id: productId } = useParams()

	const { data: product } = useQuery({
		queryKey: ['product', productId],
		queryFn: () => productService.getById(productId as string)
	})

	return product && <SingleProduct product={product.data} />
}
