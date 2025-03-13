import { z } from 'zod'

export const passwordSchema = z.string().min(5, { message: 'Enter the correct password' })

export const formLoginSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }),
	password: passwordSchema
})

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			name: z.string().min(2, { message: 'Enter first and last name' }),
			confirmPassword: passwordSchema
		})
	)
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	})

export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>
