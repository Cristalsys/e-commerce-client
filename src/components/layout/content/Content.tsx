import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import React from 'react'

import { ProfileDrawer } from '@/components/shared'

interface Props {
	toggleSidebar: () => void
	isShowedSidebar: boolean
	hasAdmin: boolean
	className?: string
}

export const Content: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	toggleSidebar,
	isShowedSidebar,
	hasAdmin
}) => {
	return (
		<div
			className='relative'
			style={{
				flex: '1 1 0%'
			}}
		>
			<section className='p-7 max-md:px-0'>
				<button
					className='opacity-85 hover:opacity-100 transition-opacity pb-4 max-md:hidden'
					onClick={toggleSidebar}
					title='Toggle sidebar'
				>
					{isShowedSidebar ? <PanelLeftClose /> : <PanelRightClose />}
				</button>
				<ProfileDrawer hasAdmin={hasAdmin}>
					<button className='md:hidden'>
						<PanelLeftClose />
					</button>
				</ProfileDrawer>
				{children}
			</section>
		</div>
	)
}
