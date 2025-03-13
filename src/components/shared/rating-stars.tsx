import { Star } from 'lucide-react'
import React from 'react'

interface Props {
	className?: string
	rating: number
}

export const RatingStars: React.FC<Props> = ({ rating }) => {
	return (
		<div className='flex'>
			{[1, 2, 3, 4, 5].map(star => (
				<Star
					key={star}
					size={18}
					className={star <= (rating ?? 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
				/>
			))}
		</div>
	)
}
