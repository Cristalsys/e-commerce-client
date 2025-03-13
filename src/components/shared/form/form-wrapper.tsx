import Link from 'next/link'
import { type PropsWithChildren } from 'react'

import { Button } from '@/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card'

import GithubButton from '../GithubButton'
import GoogleButton from '../GoogleButton'

interface FormWrapperProps {
	heading: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
}

export function FormWrapper({
	children,
	heading,
	description,
	backButtonLabel,
	backButtonHref
}: PropsWithChildren<FormWrapperProps>) {
	return (
		<div className='flex h-screen w-full items-center justify-center px-4'>
			<Card className='w-[400px] h-auto max-h-[90vh] text-xs overflow-auto'>
				<CardHeader className='space-y-2'>
					<CardTitle className='text-xl'>{heading}</CardTitle>
					{description && <CardDescription className='text-xs'>{description}</CardDescription>}
				</CardHeader>
				<CardContent>
					{children}
					<div className='relative mb-4 space-y-6'>
						<div className='absolute inset-0 flex items-center'>
							<span className='w-full border-t' />
						</div>
						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-background px-2 text-muted-foreground'>Or</span>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-6'>
						<GoogleButton />
						<GithubButton />
					</div>
				</CardContent>
				<CardFooter>
					{backButtonLabel && backButtonHref && (
						<Button
							variant='link'
							className='w-full font-normal'
						>
							<Link
								href={backButtonHref}
								className='text-xs'
							>
								{backButtonLabel}
							</Link>
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
