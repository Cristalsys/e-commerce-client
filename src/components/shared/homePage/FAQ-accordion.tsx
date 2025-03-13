import { AccordionContent } from '@radix-ui/react-accordion'
import { Plus, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

import { AccordionItem, AccordionTrigger } from '@/ui/accordion'

import { cn } from '@/lib/utils'

interface Props {
	value: number
	title: string
	description: string
	openItem: string | undefined
}

export const FAQAccordion: React.FC<Props> = ({ value, title, description, openItem }) => {
	const { theme } = useTheme()

	return (
		<AccordionItem
			value={`item-${value}`}
			className={cn(
				'w-full rounded-sm hover:shadow-md transition-all ',
				openItem === `item-${value}`
					? 'bg-primary text-white'
					: `bg-background ${theme === 'dark' ? 'text-white' : 'text-black'}`
			)}
		>
			<AccordionTrigger className='relative [&>svg]:hidden hover:no-underline mx-4'>
				<div className='flex items-center'>
					{openItem === `item-${value}` ? (
						<X
							size={20}
							className='mr-2 text-white'
						/>
					) : (
						<Plus
							size={20}
							className='mr-2 text-primary'
						/>
					)}
					{title}
				</div>
			</AccordionTrigger>
			<AccordionContent className='px-11 pb-8 text-sm'>{description}</AccordionContent>
		</AccordionItem>
	)
}
