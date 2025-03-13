import React from 'react'

import { Container } from '../container'
import { Title } from '../title'

import { Section } from './section'
import { StepsCard } from './steps-card'

export const StepsSection: React.FC = () => {
	const steps = [
		{
			numberOrder: '01',
			title: 'Choose Plant',
			description: 'We have several varieties of plants you can choose from.'
		},
		{
			numberOrder: '02',
			title: 'Place an order',
			description: 'Once your order is set, we move to the next step which is the shipping.'
		},
		{
			numberOrder: '03',
			title: 'Get plants delivered',
			description: 'Our delivery process is easy, you receive the plant direct to your door.'
		}
	]

	return (
		<Section>
			<Container>
				<div className='bg-primary pt-10 px-8 pb-10 rounded-xl'>
					<Title
						size='lg'
						className='text-white font-semibold text-center mb-6'
					>
						Steps to start your <br /> plants off right
					</Title>
					<div className='grid gap-8 grid-cols-3 pt-4 max-lg:grid-cols-2 max-md:grid-cols-1'>
						{steps.map((step, index) => (
							<StepsCard
								key={index}
								{...step}
							/>
						))}
					</div>
				</div>
			</Container>
		</Section>
	)
}
