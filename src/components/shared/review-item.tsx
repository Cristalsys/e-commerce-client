import { Star } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'
import type { IReview } from '@/types/review.types'

interface Props {
	review: IReview
	className?: string
}

export const ReviewItem: React.FC<Props> = ({ review }) => {
	return (
		<div className='mt-4 border border-gray-300 p-4 rounded-lg'>
			<div className='flex justify-between'>
				<div className='flex gap-3 items-center'>
					<div className='w-[50px] h-[50px] flex items-center justify-center bg-gray-300 text-white font-bold rounded-full'>
						{review.user.name
							.split(' ')
							.map(word => word[0])
							.join('')
							.toUpperCase()}
					</div>
					{/* )} */}
					<div>
						<div className='font-bold'>{review.user.name}</div>
						<div className={cn('flex items-center text-sm gap-0.5 mt-1')}>
							{[1, 2, 3, 4, 5].map(star => (
								<Star
									key={star}
									size={16}
									className={
										star <= review.rating ? 'text-yellow-500 fill-current' : 'text-yellow-500'
									}
								/>
							))}
						</div>
					</div>
				</div>
				<div className='text-sm text-gray-500'>
					{new Intl.DateTimeFormat('en-GB', {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					}).format(new Date(review.createdAt))}
				</div>
			</div>
			<p className='mt-4 text-[14px]'>{review.text}</p>
		</div>
	)
}
