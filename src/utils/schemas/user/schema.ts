import { z } from 'zod'

import { EnumRole } from '@/types/user.types'

export const formUserSchema = z.object({
	phone: z.string().min(10, { message: 'Invalid phone number' }),
	email: z.string().email({ message: 'Please enter a valid email address' }),
	name: z.string().min(2, { message: 'Enter first and last name' }),
	role: z.nativeEnum(EnumRole)
})

export type TFormUserValues = z.infer<typeof formUserSchema>
