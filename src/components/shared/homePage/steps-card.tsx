import React from 'react'

import { Title } from '../title'

interface Props {
	numberOrder: string
	title: string
	description: string
}

export const StepsCard: React.FC<Props> = ({ numberOrder, title, description }) => {
	return (
		<div className='rounded-xl bg-background pt-10 pr-12 pb-8 pl-6 group'>
			<div
				className='inline-block bg-primary text-white py-2 px-3 opacity-80
                                mb-6 rounded-sm text-lg transition-transform group-hover:-translate-y-1'
			>
				{numberOrder}
			</div>
			<Title
				size='xs'
				className='font-semibold mb-2'
			>
				{title}
			</Title>
			<p className='text-sm'>{description}</p>
		</div>
	)
}
