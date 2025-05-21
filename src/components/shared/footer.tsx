import { Leaf } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { SOCIAL_DATA } from '@/constants/social/social.data'

import { AnimateOnScroll } from './AnimateOnScroll'
import { Container } from './container'
import { MenuItem, Section } from './homePage'
import { Title } from './title'

export const Footer: React.FC = () => {
	const aboutItems = [
		{ label: 'About Us', href: '/' },
		{ label: 'Features', href: '/' },
		{ label: 'New & Blog', href: '/' }
	]

	const supportItems = [
		{ label: 'FAQs', href: '/' },
		{ label: 'Support Center', href: '/' },
		{ label: 'Contact us', href: '/' }
	]

	const cardImages = [
		{ src: '/images/card1.png', alt: 'card1' },
		{ src: '/images/card2.png', alt: 'card2' },
		{ src: '/images/card3.png', alt: 'card3' },
		{ src: '/images/card4.png', alt: 'card4' }
	]

	return (
		<>
			<footer>
				<Section>
					<Container>
						<AnimateOnScroll>
							<div className='grid grid-cols-4 gap-x-12 max-md:grid-cols-2 gap-y-8 max-sm:grid-cols-1'>
								<div className='mt-1'>
									<div className='mb-5'>
										<Link href='/'>
											<div className='flex items-center gap-2'>
												<Leaf className='text-primary' />
												<Title
													size='xs'
													className='uppercase font-black'
												>
													PlantShop
												</Title>
											</div>
										</Link>
									</div>
									<div className='text-sm/6 mb-6'>
										A plant shop sells various plants, pots, and gardening supplies daily.
									</div>
									<div className='flex gap-x-4 text-md'>
										{SOCIAL_DATA.map(socialItem => {
											return (
												<Link
													key={socialItem.title}
													href={socialItem.link}
													title={socialItem.title}
													className='hover:-translate-y-1 transition'
												>
													<div className='text-primary'>{<socialItem.icon />}</div>
												</Link>
											)
										})}
									</div>
								</div>
								<div>
									<MenuItem
										title='About us'
										items={aboutItems}
									/>
								</div>
								<div>
									<MenuItem
										title='Support'
										items={supportItems}
									/>
								</div>
								<div>
									<Title
										size='sm'
										className='font-semibold mb-4'
									>
										We accept all credit cards
									</Title>
									<div className='inline-flex items-center gap-x-2'>
										{cardImages.map((card, index) => (
											<Image
												key={index}
												src={card.src}
												alt={card.alt}
												width={35}
												height={35}
											/>
										))}
									</div>
								</div>
							</div>
							<p className='text-center text-xs mt-20 mb-4 text-primary'>
								&#169; All rigths reserved
							</p>
						</AnimateOnScroll>
					</Container>
				</Section>
			</footer>
		</>
	)
}
