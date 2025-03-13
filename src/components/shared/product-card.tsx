'use client'

import * as motion from 'framer-motion/m'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { PAGE } from '@/config/public-page.config'

import { addCartItem } from '@/store/cart.slice'

import { Button } from '../ui'

import { FavoriteButton } from './favorite-button'
import { ProductRating } from './product-rating'
import { Title } from './title'
import { type TAppDispatch, useTypedSelector } from '@/store'
import type { IProductItem } from '@/types/product.types'
import type { IReview } from '@/types/review.types'

interface Props {
	id: string
	name: string
	description: string
	price: number
	imageUrls: string[]
	className?: string
	reviews: IReview[]
	items: IProductItem[]
}

export const ProductCard: React.FC<Props> = ({
	className,
	description,
	id,
	imageUrls,
	name,
	price,
	reviews,
	items
}) => {
	const router = useRouter()
	const { loading } = useTypedSelector(state => state.cart)
	const dispatch = useDispatch<TAppDispatch>()

	const handleClickAdd = () => {
		const firstItem = items[0]
		try {
			if (firstItem) {
				dispatch(addCartItem(firstItem.id))
				toast.success(name + ' added to cart')
			}
		} catch (err) {
			toast.error('Failed added to cart')
			console.error(err)
		}
	}

	return (
		<motion.div
			className={className}
			whileHover={{
				scale: 1.03,
				y: -5
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30
			}}
		>
			<div className='relative'>
				<div>
					<div className='relative flex justify-center p-6 bg-secondary rounded-lg h-[220px]'>
						<Image
							src={imageUrls[0]}
							width={150}
							height={150}
							alt='name'
							className='cursor-pointer'
							onClick={() => router.push(PAGE.SHOW_PRODUCT(id))}
						/>
						<div className='absolute top-3 right-3'>
							<FavoriteButton productId={id} />
						</div>
					</div>
				</div>
				<div
					onClick={() => router.push(PAGE.SHOW_PRODUCT(id))}
					className='mb-1 mt-3 font-bold cursor-pointer'
				>
					<Title>{name}</Title>
				</div>

				<p className='text-xs/5 text-gray-400'>
					{description.slice(0, 100) + (description.length > 100 ? '...' : '')}{' '}
				</p>

				<ProductRating
					reviews={reviews}
					className='mt-1.5'
				/>

				<div className='flex justify-between items-center mt-4'>
					<span className='text-[16px]'>
						From <b>{price} $</b>
					</span>

					<Button
						variant='default'
						className='text-base font-bold'
						loading={loading}
						onClick={handleClickAdd}
					>
						<Plus
							size={20}
							className='mr-1'
						/>
						Add
					</Button>
				</div>
			</div>
		</motion.div>
	)
}
