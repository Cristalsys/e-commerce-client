'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/ui/button'

import { type TFormContactValues, formContactSchema } from '@/utils/schemas/contact/schema'

import { FormInput, FormTextarea } from '../form'

export const FormContact: React.FC = () => {
	const form = useForm<TFormContactValues>({
		resolver: zodResolver(formContactSchema),
		defaultValues: {
			email: '',
			subject: '',
			text: ''
		}
	})

	const onSubmit = async () => {
		try {
			toast.error('Message successfully sended ', {
				icon: '✅'
			})
		} catch (err) {
			console.log(err)
			toast.error('Failed to send message.', {
				icon: '❌'
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-8 mt-3'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormInput
					name='email'
					placeholder='Email'
				/>
				<FormInput
					name='subject'
					placeholder='Subject'
				/>
				<FormTextarea
					name='text'
					rows={4}
					placeholder='Message'
				/>
				<Button className='w-40 h-10 mr-2 '>
					Send message
					<ArrowUpRight />
				</Button>
			</form>
		</FormProvider>
	)
}
