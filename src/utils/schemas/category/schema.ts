import { z } from 'zod'

export const formCategorySchema = z.object({
	name: z.string().min(2, { message: 'Enter name' })
})

export type TFormCategoryValues = z.infer<typeof formCategorySchema>
