'use client'

import { type PropsWithChildren, useEffect, useState } from 'react'

import { Content } from './content/Content'
import { Sidebar } from './sidebar/sidebar'
import { cn } from '@/lib/utils'
import { authService } from '@/services/auth.service'

import styles from './layout.module.scss'

interface Props {
	hasAdmin?: boolean
}

export function Layout({ children, hasAdmin = false }: PropsWithChildren<Props>) {
	const [isShowedSidebar, setIsShowedSidebar] = useState(true)

	const toggleSidebar = () => {
		setIsShowedSidebar(!isShowedSidebar)
	}

	useEffect(() => {
		authService.initializeAuth()
	}, [])

	return (
		<main
			className={cn(
				'flex min-h-[500px]',
				styles.initialSidebar,
				isShowedSidebar ? styles.showedSidebar : styles.hidedSidebar
			)}
		>
			<Sidebar
				isShowedSidebar={isShowedSidebar}
				hasAdmin={hasAdmin}
			/>
			<Content
				toggleSidebar={toggleSidebar}
				isShowedSidebar={isShowedSidebar}
				hasAdmin={hasAdmin}
			>
				{children}
			</Content>
		</main>
	)
}
