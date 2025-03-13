'use client'

import React from 'react'

import { Textarea } from '@/ui/textarea'

import { FormInput } from './form'
import { WhiteBlock } from './white-block'

interface Props {
	className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock
			title='3. Delivery address'
			className={className}
		>
			<div className='flex flex-col gap-5'>
				<FormInput
					name='address'
					className='text-base'
					placeholder='Your address'
				/>

				<Textarea
					name='comment'
					className='text-base'
					placeholder='Comment to order'
					rows={5}
				/>
			</div>
		</WhiteBlock>
	)
}
