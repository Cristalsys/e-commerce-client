'use client'

import { Search } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useClickAway, useDebounce } from 'react-use'

import { cn } from '@/lib/utils'
import { productService } from '@/services/product.service'
import type { IProduct } from '@/types/product.types'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = React.useState('')
	const [focused, setFocused] = React.useState(false)
	const [products, setProducts] = React.useState<IProduct[]>([])
	const ref = React.useRef(null)

	const { theme } = useTheme()

	useClickAway(ref, () => {
		setFocused(false)
	})

	useDebounce(
		async () => {
			try {
				const response = await productService.getAll({ searchTerm: searchQuery })
				setProducts(response.data.products)
			} catch (error) {
				console.log(error)
			}
		},
		250,
		[searchQuery]
	)

	const onClickItem = () => {
		setFocused(false)
		setSearchQuery('')
		setProducts([])
	}

	return (
		<>
			{focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}

			<div
				ref={ref}
				className={cn('flex rounded-2xl flex-1 justify-between relative h-9 z-30', className)}
			>
				<Search
					size={16}
					className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400'
				/>
				<input
					className={`rounded-2xl outline-none w-full ${theme !== 'dark' ? 'bg-gray-100' : 'bg-secondary'}  pl-11 text-xs`}
					type='text'
					placeholder='Search plant...'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-background rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							focused && 'visible opacity-100 top-12'
						)}
					>
						{products.map(product => (
							<Link
								onClick={onClickItem}
								key={product.id}
								className='flex items-center gap-3 w-full px-3 py-2 hover:bg-secondary'
								href={`/product/${product.id}`}
							>
								<Image
									src={product.imageUrls[0]}
									alt={product.name}
									width={20}
									height={20}
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	)
}
