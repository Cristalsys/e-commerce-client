import { Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { CountButton } from './count-button'
import { convertPrice } from '@/lib/convert-price'
import { cn } from '@/lib/utils'
import type { CartItemProps } from '@/types/cart.types'

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void
	onClickRemove?: () => void
	className?: string
	hasSum?: boolean
}

export const CartItem: React.FC<Props> = ({
	className,
	details,
	imageUrls,
	name,
	price,
	quantity,
	disabled,
	onClickCountButton,
	onClickRemove,
	hasSum
}) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between border-b py-2',
				{
					'opacity-50 pointer-events-none': disabled,
					'last:border-b-0': !hasSum
				},
				className
			)}
		>
			<div className='flex items-center gap-5 flex-1'>
				<Image
					src={imageUrls[0]}
					alt={name}
					width={50}
					height={50}
				/>
				<div>
					<div className={cn('flex items-center justify-between')}>
						<h2 className='text-lg flex-1 leading-6'>{name}</h2>
					</div>
					{details && <p className='text-xs text-gray-400 w-[90%]'>{'Size: ' + details}</p>}
				</div>
			</div>
			<div className='flex items-center justify-between w-1/2'>
				<h2 className={cn('font-semibold w-[100px] text-left ')}>{convertPrice(price)}</h2>
				<div className='w-[100px] flex justify-start'>
					<CountButton
						onClick={onClickCountButton}
						value={quantity}
					/>
				</div>
				{hasSum && (
					<h2 className={cn('font-semibold text-left w-[100px] max-md:hidden')}>
						{convertPrice(price * quantity)}
					</h2>
				)}
				<button
					type='button'
					onClick={onClickRemove}
					className='w-[50px] flex justify-center max-sm:justify-end'
				>
					<Trash
						className='cursor-pointer hover:text-gray-600'
						size={20}
					/>
				</button>
			</div>
		</div>
	)
}
