'use client'

import { ArrowUp } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const ScrollUp: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY >= 400)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<Link
			href='#'
			className={`fixed right-4 bottom-4 p-2 rounded bg-primary text-white transition-opacity duration-300 ${
				isVisible ? 'opacity-80' : 'opacity-0'
			}`}
			id='scroll-up'
		>
			<ArrowUp className='text-base text-white' />
		</Link>
	)
}
