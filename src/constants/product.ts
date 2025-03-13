export const mapProductSize = {
	20: 'Small',
	30: 'Medium',
	40: 'Large'
} as const

export const productSizes = Object.entries(mapProductSize).map(([value, name]) => ({
	name,
	value
}))

export type ProductSize = keyof typeof productSizes
