'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { PAGE } from '@/config/public-page.config'

import { useAuthForm } from '@/hooks/useAuthForm'

import { formRegisterSchema } from '../../../utils/schemas/auth/schema'

import { Button, Form, FormInput, FormWrapper, Separator } from '@/components'
import type { IAuthForm } from '@/types/auth-form.types'

export const Register: React.FC = ({}) => {
	const form = useForm<IAuthForm>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	})

	const { isLoading, onSubmit } = useAuthForm('register', form.reset)

	return (
		<FormWrapper
			heading='Registration'
			description='To enter the site, enter your email and password'
			backButtonLabel='Already have an account? Sign in'
			backButtonHref={`${PAGE.LOGIN}`}
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
						name='name'
						label='Full Name'
						required
					/>
					<FormInput
						name='password'
						label='Password'
						isPassword
						required
					/>
					<FormInput
						name='confirmPassword'
						label='ConfirmPassword'
						isPassword
						required
					/>
					<Button
						type='submit'
						disabled={isLoading}
					>
						Create account
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}
