'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'

interface Props {
	className?: string
	images: string[]
}

export const ProductGallery: React.FC<Props> = ({ images }) => {
	const [selectedImage, setSelectedImage] = useState(images[0])

	if (!images || images.length === 0) {
		return <p className='text-gray-500'>No images available</p>
	}

	return (
		<div className='max-w-xl mx-auto'>
			<div className='flex justify-center'>
				<Image
					src={selectedImage}
					alt='Product Image'
					width={300}
					height={300}
					className={cn('relative left-2 top-2 transition-all duration-300 w-[320px] h-[320px]')}
				/>
			</div>

			<div className='relative mt-8 w-[500px] overflow-x-auto whitespace-nowrap scrollbar-custom'>
				<div className='flex gap-2 w-max'>
					{images.map((img, index) => (
						<button
							key={index}
							onClick={() => setSelectedImage(img)}
							className={cn(
								'w-16 h-16 p-1 border-2 rounded-md transition-all',
								selectedImage === img ? 'border-primary' : 'border-gray-200'
							)}
						>
							<Image
								width={50}
								height={50}
								src={img}
								alt={`Thumbnail ${index}`}
								className='w-full h-full'
							/>
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
