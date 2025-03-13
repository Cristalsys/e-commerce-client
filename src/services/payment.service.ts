import { instance } from '@/api/axios'

import type { IPaymentResponse } from '@/types/payment.types'

class PaymentService {
	private _PAYMENT = '/payment'

	createPayment(amount: number) {
		return instance.post<IPaymentResponse>(this._PAYMENT, amount)
	}
}

export const paymentService = new PaymentService()
