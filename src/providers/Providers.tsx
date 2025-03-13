'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 1,
						refetchOnWindowFocus: false
					},
					mutations: {
						retry: 1
					}
				}
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate
					loading={null}
					persistor={persistor}
				>
					<NextThemesProvider
						attribute={'class'}
						defaultTheme='light'
						disableTransitionOnChange
					>
						<LazyMotion features={domAnimation}>
							{children}
							<Toaster />
						</LazyMotion>
					</NextThemesProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}
