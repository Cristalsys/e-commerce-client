'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

import { Button } from '@/components/ui/button'

interface Props {
	className?: string
}

export const ToggleTheme: React.FC<Props> = ({ className }) => {
	const [isDarkMode, setIsDarkMode] = React.useState(false)
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => {
		setIsDarkMode(prev => !prev)
		if (isDarkMode) {
			setTheme('light')
		} else {
			setTheme('dark')
		}
	}

	React.useEffect(() => {
		if (theme) {
			setIsDarkMode(theme === 'dark')
		}
	}, [theme])

	return (
		<div className={className}>
			<Button
				variant='ghost'
				size='icon'
				onClick={toggleTheme}
				title='Toggle theme'
			>
				<div className='relative w-6 h-6 flex items-center justify-center'>
					{isDarkMode ? (
						<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					) : (
						<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					)}
				</div>
				<span className='sr-only'>Toggle theme</span>
			</Button>
		</div>
	)
}
