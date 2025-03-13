import { Mail, Phone } from 'lucide-react'
import React from 'react'

import { Container } from '../container'
import { Title } from '../title'

import { FormContact } from './form-contact'
import { Section } from './section'

export const ContactSection: React.FC = () => {
	const contactInfo = [
		{
			title: 'Call us for instant support',
			icon: (
				<Phone
					size={16}
					className='mr-2'
				/>
			),
			info: '+999 888 777'
		},
		{
			title: 'Write us by mail',
			icon: (
				<Mail
					size={16}
					className='mr-2'
				/>
			),
			info: 'user@email.com'
		}
	]

	return (
		<Section>
			<Container>
				<div className='grid grid-cols-2 gap-x-7 max-md:grid-cols-1 max-md:gap-y-6 '>
					<div>
						<div>
							<Title
								size='lg'
								className='font-semibold'
							>
								Reach out to us today <br /> via any of the given <br /> information
							</Title>
							<div className='mt-6 flex flex-col gap-6'>
								{contactInfo.map((item, index) => (
									<div key={index}>
										<Title size='xs'>{item.title}</Title>
										<span className='flex items-center mt-1 font-medium'>
											{item.icon}
											{item.info}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div>
						<FormContact />
					</div>
				</div>
			</Container>
		</Section>
	)
}
