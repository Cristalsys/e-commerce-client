'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { Select } from '@/components/shared/select'

import { useUserEdit } from '@/hooks/useUserEdit'

import { type TFormUserValues, formUserSchema } from '@/utils/schemas/user/schema'

import { Button, FormInput } from '@/components'
import { EnumRole } from '@/types/user.types'

interface Props {
	className?: string
	userId: string
}

export const USerEDit: React.FC<Props> = ({ className, userId }) => {
	const { user, onSubmit } = useUserEdit(userId)

	useEffect(() => {
		console.log('user', user)
	}, [user])

	const form = useForm<TFormUserValues>({
		resolver: zodResolver(formUserSchema),
		mode: 'onChange',
		defaultValues: {
			name: user?.name || '',
			email: user?.email || '',
			phone: user?.phone || '',
			role: user?.role || EnumRole.USER
		}
	})

	useEffect(() => {
		if (user) {
			const currentValues = form.getValues()

			if (
				currentValues.name !== user?.name ||
				currentValues.email !== user?.email ||
				currentValues.phone !== user?.phone ||
				currentValues.role !== user?.role
			) {
				form.reset({
					name: user?.name || '',
					email: user?.email || '',
					phone: user?.phone || '',
					role: user?.role || EnumRole.USER
				})
			}
		}
	}, [user, form])

	const roles = [
		{
			label: 'User',
			value: EnumRole.USER
		},
		{
			label: 'Admin',
			value: EnumRole.ADMIN
		}
	]

	return (
		<div className={className}>
			<FormProvider {...form}>
				<form
					className=''
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className='grid grid-cols-2 gap-5 w-full'>
						<FormInput
							name='email'
							label='E-Mail'
							required
						/>
						<FormInput
							name='name'
							label='Full name'
							required
						/>
						<FormInput
							name='phone'
							label='Phone'
							required
						/>
						<Controller
							name='role'
							control={form.control}
							rules={{
								required: 'Enter role'
							}}
							render={({ field, fieldState: { error } }) => (
								<Select
									error={error}
									field={field}
									placeholder='Role'
									options={roles || []}
									required
									isMulti={false}
								/>
							)}
						/>
					</div>
					<Button
						disabled={form.formState.isSubmitting}
						className='text-base'
						type='submit'
					>
						Save
					</Button>
				</form>
			</FormProvider>
		</div>
	)
}
