'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { PAGE } from '@/config/public-page.config'

import { useAuthForm } from '@/hooks/useAuthForm'

import { type TFormLoginValues, formLoginSchema } from '../../../utils/schemas/auth/schema'

import { FormInput } from '@/components'
import { Button, Form, FormWrapper, Separator } from '@/components'

export const Login: React.FC = ({}) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { isLoading, onSubmit } = useAuthForm('login', form.reset)

	return (
		<FormWrapper
			heading='Login'
			description='To enter the site, enter your email and password'
			backButtonLabel="Don't have an account yet? Register"
			backButtonHref={`${PAGE.REGISTER}`}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<Separator />
					<FormInput
						name='email'
						label='E-Mail'
						required
					/>
					<FormInput
						name='password'
						label='Password'
						isPassword
						required
					/>
					<Button
						type='submit'
						disabled={isLoading}
					>
						Log in to your account
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}
