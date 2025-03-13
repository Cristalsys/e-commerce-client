import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useSet } from 'react-use'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryFilters extends PriceProps {
	sizes: string
	categories: string
	ratings: string
}

export interface Filters {
	sizes: Set<string>
	ratings: Set<string>
	selectedCategories: Set<string>
	prices: PriceProps
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void
	setSizes: (value: string) => void
	setRatings: (value: string) => void
	setSelectedCategories: (value: string) => void
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

	const [selectedCategories, { toggle: toggleCategories }] = useSet(
		new Set<string>(searchParams.get('categories')?.split(','))
	)

	const [ratings, { toggle: toggleRatings }] = useSet(
		new Set<string>(searchParams.get('ratings')?.split(','))
	)

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [])
	)

	const [prices, setPrices] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined
	})

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices(prev => ({
			...prev,
			[name]: value
		}))
	}

	return React.useMemo(
		() => ({
			sizes,
			selectedCategories,
			prices,
			ratings,
			setPrices: updatePrice,
			setSizes: toggleSizes,
			setRatings: toggleRatings,
			setSelectedCategories: toggleCategories
		}),
		[sizes, selectedCategories, prices, ratings, toggleSizes, toggleRatings, toggleCategories]
	)
}
