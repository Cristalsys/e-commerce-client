import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Head from 'next/head'

import { Providers } from '@/providers/Providers'

import { SITE_NAME, SITE_URL } from '@/constants/constants'

import './globals.scss'

const nunito = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
	title: {
		absolute: `${SITE_NAME}`,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Best app for buying plants',
	icons: {
		icon: 'images/favicon.png'
	},
	openGraph: {
		type: 'website',
		siteName: 'localhost',
		emails: [`info@plantshop.com`],
		images: [
			{
				url: '/images/favicon.jpg',
				width: 909,
				height: 500,
				alt: `${SITE_NAME}`
			}
		]
	},
	metadataBase: new URL(SITE_URL),
	applicationName: `${SITE_NAME}`,
	formatDetection: {
		telephone: false
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
			</Head>
			<body className={nunito.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
