import { instance } from '@/api/axios'

import type { ICreatePromocode, IPromocode } from '@/types/promocode.types'

export interface IApplyPromocodeResponse {
	discountPercentage: number
	discount: number
	totalWithDiscount: number
}

class PromocodeService {
	private _PROMOCODE = '/promocode'

	getAll(searchTerm?: string) {
		return instance.get<IPromocode[]>(this._PROMOCODE, {
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	}

	create(data: ICreatePromocode) {
		return instance.post<IPromocode>(`${this._PROMOCODE}/create`, data)
	}

	applyPromocode(code: string, cartTotal: number) {
		console.log('apply')
		return instance.post<IApplyPromocodeResponse>(`${this._PROMOCODE}/apply`, {
			code,
			cartTotal
		})
	}

	delete(id: string) {
		return instance.delete<IPromocode>(`${this._PROMOCODE}/${id}`)
	}
}

export const promocodeService = new PromocodeService()
