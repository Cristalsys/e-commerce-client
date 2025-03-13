import { z } from 'zod'

export const formContactSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }),
	subject: z.string().min(2, 'Subject must contain at least 2 characters'),
	text: z.string().optional()
})

export type TFormContactValues = z.infer<typeof formContactSchema>
