import Link from 'next/link'
import React from 'react'

import { Title } from '../title'

interface Props {
	title: string
	items: {
		label: string
		href: string
	}[]
}

export const MenuItem: React.FC<Props> = ({ title, items }) => {
	return (
		<>
			<Title
				size='sm'
				className='font-semibold mb-4'
			>
				{title}
			</Title>
			<ul className='text-sm flex flex-col gap-y-2 transition-all'>
				{items.map((item, index) => (
					<li key={index}>
						<Link
							href={item.href}
							className='hover:underline hover:underline-offset-8'
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}
