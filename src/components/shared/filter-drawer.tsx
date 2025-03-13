import React, { type PropsWithChildren } from 'react'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/ui/sheet'

import { Filtration } from './filtration'

export const FilterDrawer: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				side='left'
				className='max-h-screen overflow-y-auto pl-8 pr-16 py-8'
			>
				<SheetHeader className='text-left'>
					<SheetTitle></SheetTitle>
					<Filtration />
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}
