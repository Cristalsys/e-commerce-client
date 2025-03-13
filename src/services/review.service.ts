import { axiosClassic, instance } from '@/api/axios'

import type { IReview, IReviewResponsePage } from '@/types/review.types'

export interface IReviewResponse {
	rating: number
	text: string
}

class ReviewService {
	private _REVIEWS = '/reviews'

	getAllById(productId: string, page: number) {
		return axiosClassic.get<IReviewResponsePage>(`${this._REVIEWS}/${productId}`, {
			params: { page }
		})
	}

	async getAll() {
		const data = await instance.get<IReview[]>(`${this._REVIEWS}`)
		return data
	}

	delete(id: string) {
		return instance.delete<IReview>(`${this._REVIEWS}/${id}`)
	}

	getAverageByProduct(productId: string) {
		return instance.get<number>(`${this._REVIEWS}/average-by-product/${productId}`)
	}

	leave(productId: string, data: IReviewResponse) {
		return instance.post<IReview>(`${this._REVIEWS}/leave/${productId}`, data)
	}
}

export const reviewService = new ReviewService()
