'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React from 'react'

import { Button } from '../ui'

import { ReviewItem } from './review-item'
import { Title } from './title'
import { reviewService } from '@/services/review.service'

interface Props {
	productId: string
	className?: string
}

export const Reviews: React.FC<Props> = ({ className, productId }) => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['reviews', productId],
		queryFn: ({ pageParam = 1 }) => reviewService.getAllById(productId, pageParam),
		getNextPageParam: (lastPage, allPages) =>
			lastPage.data.hasMore ? allPages.length + 1 : undefined,
		initialPageParam: 1
	})

	const allReviews = data?.pages.flatMap(page => page.data.reviews) || []

	return (
		<div className={className}>
			{allReviews && allReviews.length > 0 && (
				<>
					<Title
						size='md'
						className='font-semibold mt-6'
					>
						Reviews
					</Title>
					<div className='mt-8'>
						{allReviews &&
							allReviews.length > 0 &&
							allReviews.map(review => (
								<ReviewItem
									key={review.id}
									review={review}
								/>
							))}
					</div>
					{hasNextPage && (
						<div className='flex justify-center'>
							<Button
								onClick={() => fetchNextPage()}
								disabled={isFetchingNextPage}
								className='mt-4'
							>
								{isFetchingNextPage ? <Loader className='w-5 h-5 animate-spin' /> : 'Show More'}
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	)
}
