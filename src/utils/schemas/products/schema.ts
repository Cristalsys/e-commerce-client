import { z } from 'zod'

export const formProductSchema = z.object({
	name: z.string().min(2, { message: 'Enter name' }),
	description: z.string().optional(),
	// imageUrls: z.string().min(1, { message: 'Enter image' }),
	imageUrls: z
		.array(z.string().min(1, { message: 'Enter image' }))
		.min(1, { message: 'At least one image required' }),
	categoryId: z.string().min(1, { message: 'Enter category' }),

	items: z
		.array(
			z.object({
				price: z.number().min(1, 'Price > 0'),
				size: z.union([z.literal(20), z.literal(30), z.literal(40)])
			})
		)
		.min(1, 'Add price and size')
})

export type TFormProductValues = z.infer<typeof formProductSchema>
