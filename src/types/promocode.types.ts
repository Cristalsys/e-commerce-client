export interface IPromocode {
	id: string
	code: string
	discount: number
	expiresAt: Date
}

export type ICreatePromocode = Omit<IPromocode, 'id'>
