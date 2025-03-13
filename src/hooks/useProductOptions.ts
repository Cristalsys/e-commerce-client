import React from 'react'

import { type ProductSize, productSizes } from '@/constants/product'

import type { IProductItem } from '@/types/product.types'

export type Variant = {
	name: string
	value: string
	disabled?: boolean
}

interface ReturnProps {
	size: ProductSize
	availableSizes: Variant[]
	currentItemId?: string
	setSize: (size: ProductSize) => void
}

export function useProductOptions(items: IProductItem[]): ReturnProps {
	const [size, setSize] = React.useState<ProductSize>(20)

	const availableSizes = productSizes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !items.some(product => Number(product.size) === Number(item.value))
	}))

	const currentItemId = items.find(item => item.size === size)?.id

	React.useEffect(() => {
		const isAvailableSize = availableSizes?.find(
			item => Number(item.value) === size && !item.disabled
		)
		const availableSize = availableSizes?.find(item => !item.disabled)

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as ProductSize)
		}
	}, [availableSizes, size])

	return {
		size,
		setSize,
		currentItemId,
		availableSizes
	}
}
