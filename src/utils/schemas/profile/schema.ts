import { z } from 'zod'

export const passwordSchema = z
	.string()
	.min(5, { message: 'Enter the correct password' })
	.optional()
	.or(z.literal(''))

export const formProfileSchema = z
	.object({
		phone: z.string().min(10, { message: 'Invalid phone number' }),
		email: z.string().email({ message: 'Please enter a valid email address' }),
		password: passwordSchema,
		name: z.string().min(2, { message: 'Enter first and last name' }),
		confirmPassword: passwordSchema
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	})

export type TFormProfileValues = z.infer<typeof formProfileSchema>
