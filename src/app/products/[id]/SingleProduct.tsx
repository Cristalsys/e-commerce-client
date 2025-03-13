'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { Title } from '@/components/shared/title'

import type { ProductSize } from '@/constants/product'

import { addCartItem } from '@/store/cart.slice'

import { useProductOptions } from '@/hooks/useProductOptions'

import {
	Button,
	Container,
	FavoriteButton,
	GroupVariants,
	ProductGallery,
	ProductRating,
	ReviewDialog,
	Reviews,
	SimilarProduct
} from '@/components'
import { convertPrice } from '@/lib/convert-price'
import { cn } from '@/lib/utils'
import { type TAppDispatch, useTypedSelector } from '@/store'
import type { IProduct } from '@/types/product.types'

interface Props {
	product: IProduct
	className?: string
}

export const SingleProduct: React.FC<Props> = ({ product }) => {
	const dispatch = useDispatch<TAppDispatch>()

	const { loading } = useTypedSelector(state => state.cart)
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleText = () => setIsExpanded(!isExpanded)

	const { availableSizes, setSize, size, currentItemId } = useProductOptions(product.items)

	const productPrice = product.items.find(item => item.size === size)?.price || 0

	const handleClickAdd = () => {
		const firstItem = product.items[0]
		try {
			if (currentItemId) {
				dispatch(addCartItem(currentItemId ?? firstItem))
				toast.success(product.name + ' added to cart')
			}
		} catch (err) {
			toast.error('Failed added to cart')
			console.error(err)
		}
	}

	return (
		<div>
			<Container className='flex flex-col my-10'>
				<div className={cn('flex gap-8 flex-1 max-lg:flex-col')}>
					<div className={cn('flex justify-center flex-1 relative w-full')}>
						<ProductGallery images={product.imageUrls} />
					</div>
					<div className='w-[490px] flex flex-col gap-5 max-lg:w-full'>
						<div className='flex items-center gap-x-3'>
							<Title
								size='md'
								className='font-extrabold mb-1'
							>
								{product.name}
							</Title>
							<FavoriteButton productId={product.id} />
						</div>
						<ProductRating reviews={product?.reviews} />
						<div className='flex items-center gap-x-3'>
							<div className='mb-1 font-semibold text-lg'>Size:</div>
							<GroupVariants
								items={availableSizes}
								value={String(size)}
								onClick={value => setSize(Number(value) as ProductSize)}
							/>
						</div>
						<div className='font-bold'>{convertPrice(productPrice)}</div>
						<div className='flex gap-x-4'>
							<Button
								loading={loading}
								onClick={handleClickAdd}
								variant={'outline'}
								className='w-36'
							>
								Add to cart
							</Button>
							<ReviewDialog productId={product.id}>
								<Button className='w-36'>Send Review</Button>
							</ReviewDialog>
						</div>
						<div>
							<b>Description</b>
							<div className='mt-1 text-xs/5'>
								{' '}
								{isExpanded
									? product.description
									: product.description.slice(0, 300) +
										(product.description.length > 300 ? '...' : '')}
							</div>
							{product.description.length > 100 && (
								<button
									onClick={toggleText}
									className='text-primary underline mt-1'
								>
									{isExpanded ? 'Close' : 'Show more'}
								</button>
							)}
						</div>
					</div>
				</div>
				<SimilarProduct className='mt-12' />
				<Reviews productId={product.id} />
			</Container>
		</div>
	)
}
