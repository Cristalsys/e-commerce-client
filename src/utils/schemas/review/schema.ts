import { z } from 'zod'

export const reviewFormSchema = z.object({
	text: z.string().min(2, { message: 'The name must contain at least 2 characters' }),
	rating: z
		.number()
		.min(1, { message: 'Rating must be at least 1 star' })
		.max(5, { message: 'Rating must not exceed' })
})

export type ReviewFormValues = z.infer<typeof reviewFormSchema>
