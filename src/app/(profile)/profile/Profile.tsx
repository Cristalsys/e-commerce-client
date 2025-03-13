'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Title } from '@/components/shared/title'

import { useProfile } from '@/hooks/useProfile'

import { type TFormProfileValues, formProfileSchema } from '@/utils/schemas/profile/schema'

import { Button, FormInput } from '@/components'
import { userService } from '@/services/user.service'

const Profile: React.FC = () => {
	const { profile } = useProfile()
	const queryClient = useQueryClient()
	const [isEditing, setIsEditing] = useState(false)

	const form = useForm<TFormProfileValues>({
		resolver: zodResolver(formProfileSchema),
		defaultValues: {
			name: profile?.name,
			email: profile?.email,
			phone: profile?.phone,
			password: '',
			confirmPassword: ''
		}
	})

	useEffect(() => {
		if (profile) {
			const currentValues = form.getValues()

			if (
				currentValues.name !== profile.name ||
				currentValues.email !== profile.email ||
				currentValues.phone !== profile.phone
			) {
				form.reset({
					name: profile.name || '',
					email: profile.email || '',
					phone: profile.phone || '',
					password: '',
					confirmPassword: ''
				})
			}
		}
	}, [profile, form])

	const onSubmit = async (data: TFormProfileValues) => {
		const formData = new FormData()
		formData.append('name', data.name)
		formData.append('email', data.email)
		formData.append('phone', data.phone)
		if (data.password) {
			formData.append('password', data.password)
		}

		try {
			await userService.updateProfile(formData)
			await queryClient.invalidateQueries({ queryKey: ['get-profile'] })

			toast.error('The data is updated 📝', {
				icon: '✅'
			})
			setIsEditing(false)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			return toast.error('Error updating data', {
				icon: '❌'
			})
		}
	}

	return (
		<div>
			<Title
				size='md'
				className='font-bold'
			>{`Personal Data | #${profile.id}`}</Title>

			{!isEditing ? (
				// ✅ Режим просмотра данных
				<div className='mt-6 grid grid-cols-[120px_1fr] gap-4'>
					<strong>Full Name:</strong> <span>{profile.name}</span>
					<strong>Email:</strong> <span>{profile.email}</span>
					<strong>Phone:</strong> <span>{profile.phone}</span>
					<div>
						<Button
							onClick={() => setIsEditing(true)}
							className='mt-4'
						>
							Edit data
						</Button>
					</div>
				</div>
			) : (
				<FormProvider {...form}>
					<form
						encType='multipart/form-data'
						className='flex flex-col'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className='flex gap-12 mt-10 max-md:flex-col'>
							<div className='flex flex-col gap-5 mb-8 w-full'>
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
								<FormInput
									name='password'
									label='Password'
									isPassword
								/>
								<FormInput
									name='confirmPassword'
									label='ConfirmPassword'
									isPassword
								/>
							</div>
						</div>
						<div className='flex gap-4'>
							<Button
								disabled={form.formState.isSubmitting}
								className='text-base'
								type='submit'
							>
								Save
							</Button>
							<Button
								variant='outline'
								onClick={() => setIsEditing(false)}
							>
								Cancel
							</Button>
						</div>
					</form>
				</FormProvider>
			)}
		</div>
	)
}

export default Profile
