'use client'

import React from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'

import { setActiveSection } from '@/store/activeSection.slice'

interface Props {
	sectionId: string
	className?: string
}

export const SectionIntersection: React.FC<React.PropsWithChildren<Props>> = ({
	sectionId,
	children
}) => {
	const dispatch = useDispatch()

	const { ref, inView } = useInView({
		triggerOnce: false,
		threshold: [0.41] // Настройка видимости (когда 10% элемента видно)
	})

	React.useEffect(() => {
		if (inView) {
			dispatch(setActiveSection(sectionId)) // Отправляем в Redux когда элемент стал видимым
		}
	}, [inView, sectionId, dispatch])

	return (
		<section
			ref={ref}
			id={sectionId}
		>
			{children}
		</section>
	)
}
