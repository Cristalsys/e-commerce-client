import { MousePointerClick } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/ui/button'

import { SOCIAL_DATA } from '@/constants/social/social.data'

import { Container } from '../container'
import { Title } from '../title'

export const HomeSection: React.FC = () => {
	return (
		<section className='py-16'>
			<Container>
				<div className='relative'>
					<div className='grid grid-cols-2 gap-16 items-center h-full relative max-md:grid-cols-1'>
						<div className='flex flex-col justify-center gap-4 max-md:order-2'>
							<Title
								size='2xl'
								className='font-bold max-lg:text-[38px]'
							>
								Plants will make <br /> your life better
							</Title>
							<p className='text-sm/6 mb-4  '>
								Create an incredible plant design for your office or apartment! Bring freshness to
								your space and inspire new ideas with lush greenery. Our expert team will help you
								choose the perfect plants to enhance your environment, improve air quality, and
								create a calming atmosphere.
							</p>
							<Link href={'/products'}>
								<Button className='w-32 '>
									Shop now
									<MousePointerClick />
								</Button>
							</Link>
						</div>
						<Image
							src='/images/home.png'
							alt='home'
							width={350}
							height={350}
							className='justify-self-center max-md:order-1 max-lg:w-[280px]'
						/>
					</div>
					<div className='absolute top-[6.5rem] max-md:top-[4rem] right-[-1rem] grid justify-items-center space-y-[3.5rem]'>
						<span
							className='relative rotate-90 font-medium text-sm text-primary 
        after:content-[""] after:absolute after:right-[-45%] after:top-1/2 after:w-[1rem] after:h-[2px] after:bg-primary
        mb-2'
						>
							Follow us
						</span>
						<div className='flex flex-col gap-3'>
							{SOCIAL_DATA.map(socialItem => {
								return (
									<Link
										key={socialItem.title}
										href={socialItem.link}
										title={socialItem.title}
										className='hover:translate-x-1 transition'
									>
										<div className='text-primary'>{<socialItem.icon />}</div>
									</Link>
								)
							})}
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}
