import type { IUser } from './user.types'

export interface IReview {
	id: string
	user: IUser
	createdAt: string
	text: string
	rating: number
}

export interface IReviewResponsePage {
	reviews: IReview[]
	totalCount: number
	hasMore: boolean
}

export interface IReviewPagination {
	page?: number
	limit?: number
}
