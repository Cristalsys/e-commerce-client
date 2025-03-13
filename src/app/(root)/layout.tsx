import type { Metadata } from 'next'

import { Footer, Header, ScrollUp } from '@/components'

export const metadata: Metadata = {
	title: 'Main'
}

export default function HomeLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className='min-h-screen'>
			<Header />
			{children}
			<Footer />
			<ScrollUp />
		</main>
	)
}
