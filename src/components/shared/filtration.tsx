'use client'

import React from 'react'

import { useCategories } from '@/hooks/useCategories'
import { useFilters } from '@/hooks/useFilters'
import { useQueryFilters } from '@/hooks/useQueryFilters'

import { Input, Separator } from '../ui'

import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { RangeSlider } from './range-slider'
import { RatingStars } from './rating-stars'

interface Props {
	className?: string
}

export const Filtration: React.FC<Props> = ({ className }) => {
	const { categories, isLoading } = useCategories()
	const filters = useFilters()

	useQueryFilters(filters)

	const items = categories
		? categories.map(item => ({ value: String(item.id), text: item.name }))
		: []

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}

	return (
		<div className={className}>
			<CheckboxFiltersGroup
				title='Sizes'
				name='sizes'
				className='mb-5'
				onClickCheckbox={filters.setSizes}
				selected={filters.sizes}
				items={[
					{ text: 'small', value: '20' },
					{ text: 'medium', value: '30' },
					{ text: 'large', value: '40' }
				]}
			/>

			<Separator />

			<div className='py-6 pb-7'>
				<p className='font-bold mb-3'>Price from & to:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						className='h-7'
						value={String(filters.prices.priceFrom)}
						onChange={e => filters.setPrices('priceFrom', Number(e.target.value))}
					/>
					<Input
						type='number'
						min={100}
						max={1000}
						placeholder='1000'
						className='h-7'
						value={String(filters.prices.priceTo)}
						onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>

				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
					onValueChange={updatePrices}
				/>
			</div>

			<Separator />

			<CheckboxFiltersGroup
				title='Categories'
				name='categories'
				className='mt-5 mb-5'
				limit={3}
				items={items}
				loading={isLoading}
				onClickCheckbox={filters.setSelectedCategories}
				selected={filters.selectedCategories}
			/>

			<Separator />

			<CheckboxFiltersGroup
				title='Rating'
				name='rating'
				className='mt-5'
				limit={5}
				onClickCheckbox={filters.setRatings}
				selected={filters.ratings}
				items={Array.from({ length: 5 }, (_, index) => index + 1).map(rating => ({
					text: <RatingStars rating={rating} />,
					value: String(rating)
				}))}
			/>
		</div>
	)
}
