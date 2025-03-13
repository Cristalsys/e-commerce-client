import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import type { IListItem } from '@/components/shared/adminPage/admin-list'

import { reviewService } from '@/services/review.service'

export function useAdminReviews() {
	const queryClient = useQueryClient()

	const { data: reviews, isLoading } = useQuery({
		queryKey: ['get reviews for admin dashboard'],
		queryFn: () => reviewService.getAll(),
		select: data =>
			data.data.map((review): IListItem => {
				return {
					id: review.id,
					items: [
						`⭐️`.repeat(review.rating),
						review.user?.name || '',
						new Intl.DateTimeFormat('en-GB', {
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						}).format(new Date(review.createdAt)),
						review.text
					]
				}
			})
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete review'],
		mutationFn: (reviewId: string) => reviewService.delete(reviewId),
		onSuccess() {
			toast.success('Review is deleted')
			queryClient.invalidateQueries({
				queryKey: ['get reviews for admin dashboard']
			})
		},
		onError() {
			toast.error('Error during deleting')
		}
	})

	return useMemo(
		() => ({
			reviews,
			isLoading,
			deleteAsync
		}),
		[reviews, isLoading, deleteAsync]
	)
}
