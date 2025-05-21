'use client'

import React, { useState } from 'react'

import { Accordion } from '@/ui/accordion'

import { Container } from '../container'
import { Title } from '../title'

import { FAQAccordion } from './FAQ-accordion'
import { Section } from './section'
import { AnimateOnScroll } from '../AnimateOnScroll'

export const QuestionSection: React.FC = () => {
	const [openItem, setOpenItem] = useState<string | undefined>(undefined)

	const faqItems = [
		{
			value: 1,
			title: 'My flowers are falling off or dying?',
			description:
				'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.'
		},
		{
			value: 2,
			title: 'What causes leaves to become pale?',
			description:
				'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.'
		},
		{
			value: 3,
			title: 'What causes brown crispy leaves?',
			description:
				'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.'
		},
		{
			value: 4,
			title: 'How do i choose a plant?',
			description:
				'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.'
		},
		{
			value: 5,
			title: 'How do I change the pots?',
			description:
				'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.'
		},
		{
			value: 6,
			title: 'Why are gnats flying around my plant?',
			description:
				'Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.'
		}
	]

	return (
		<Section className='bg-secondary'>
			<Container>
				<Title
					size='lg'
					className='font-semibold'
				>
					Some common questions <br />
					were often asked
				</Title>
				<AnimateOnScroll>
				<div className='py-11'>
					<Accordion
						type='single'
						collapsible
						value={openItem}
						onValueChange={setOpenItem}
						className='grid grid-cols-2 gap-6 items-start max-md:grid-cols-1'
					>
						{faqItems.map(item => (
							<FAQAccordion
								key={item.value}
								{...item}
								openItem={openItem}
							/>
						))}
					</Accordion>
				</div>
				</AnimateOnScroll>
			</Container>
		</Section>
	)
}
