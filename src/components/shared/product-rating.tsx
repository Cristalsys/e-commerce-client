'use client'

import { Star } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'
import type { IReview } from '@/types/review.types'

interface Props {
	reviews: IReview[]
	className?: string
}

export const ProductRating: React.FC<Props> = ({ className, reviews }) => {
	const [rating] = useState<number>(() => {
		if (!reviews || reviews.length === 0) return 0 // Проверяем на пустоту
		const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
		return Math.round(sum / reviews.length) // Считаем средний рейтинг
	})

	return (
		<div className={cn('flex items-center text-sm gap-0.5', className)}>
			{[1, 2, 3, 4, 5].map(star => (
				<Star
					key={star}
					size={18}
					className={star <= (rating ?? 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
				/>
			))}
			<div className='ml-1'>({reviews?.length || 0} reviews)</div>
		</div>
	)
}
