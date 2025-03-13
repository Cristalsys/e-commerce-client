import { ArrowDownRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/ui/button'

import { Container } from '../container'
import { Title } from '../title'

import { AboutDetails } from './about-details'
import { Section } from './section'

export const AboutSection: React.FC = () => {
	const aboutDetails = [
		'We always deliver on time.',
		'We give you guides to protect and care for your plants.',
		'We always come over for a check-up after sale.',
		'100% money back guaranteed.'
	]

	return (
		<Section>
			<Container>
				<div className='grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-y-10'>
					<div>
						<Image
							src='/images/about.png'
							alt='about'
							width={375}
							height={375}
							className='max-md:w-[300px] mx-auto'
						/>
					</div>
					<div>
						<div>
							<Title
								size='lg'
								className='font-semibold mb-4'
							>
								Who we really are & why choose us
							</Title>
							<p className='mb-8 text-sm/6'>
								We have over 4000+ unbiased reviews and our customers trust our plant process and
								delivery service every time. We take pride in providing healthy, vibrant plants.
							</p>
							<div className='grid gap-y-5 mb-10'>
								{aboutDetails.map((detail, index) => (
									<AboutDetails key={index}>{detail}</AboutDetails>
								))}
							</div>
							<Link href={'#Products'}>
								<Button
									variant={'outline'}
									className='w-32'
								>
									Explore
									<ArrowDownRight />
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	)
}
