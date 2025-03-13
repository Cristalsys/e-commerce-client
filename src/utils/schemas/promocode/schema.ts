import { z } from 'zod'

export const formPromocodeSchema = z.object({
	code: z.string().min(2, { message: 'Enter code' }),
	discount: z.coerce
		.number()
		.min(0, { message: 'Discount must be at least 0' })
		.max(100, { message: 'Discount must be at most 100' }),
	expired: z.date().refine(date => date > new Date(), {
		message: 'Expiration date must be in the future'
	})
})

export type TFormPromocodeValues = z.infer<typeof formPromocodeSchema>
