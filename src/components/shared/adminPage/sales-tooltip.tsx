import { useTheme } from 'next-themes'
import React from 'react'

import { convertPrice } from '@/lib/convert-price'

interface Props {
	active?: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any[]
	label?: string
}

export const SalesTooltip: React.FC<Props> = ({ active, payload, label }) => {
	const { theme } = useTheme()

	if (active && payload && payload.length) {
		return (
			<div
				className={`p-3 ${theme !== 'dark' ? 'bg-gray-100' : 'bg-secondary'} flex flex-col rounded-lg`}
			>
				<p className={'text-center'}>{label}</p>
				<p className={'text-sm mt-2'}>
					Income:
					<span className='ml-2'>{convertPrice(payload[0].value)}</span>
				</p>
			</div>
		)
	}

	return null
}
