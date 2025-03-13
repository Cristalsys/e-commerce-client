'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Star } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import { Textarea } from '@/ui/textarea'

import { type ReviewFormValues, reviewFormSchema } from '@/utils/schemas/review/schema'

import { Button } from '../ui'

import { ErrorText } from './error-text'
import { type IReviewResponse, reviewService } from '@/services/review.service'
import { useTypedSelector } from '@/store'

interface Props {
	productId: string
	className?: string
}

export const ReviewDialog: React.FC<React.PropsWithChildren<Props>> = ({ children, productId }) => {
	const [open, setOpen] = useState(false)
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	const form = useForm<ReviewFormValues>({
		resolver: zodResolver(reviewFormSchema),
		defaultValues: {
			rating: 0,
			text: ''
		}
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['leave review'],
		mutationFn: (data: IReviewResponse) => {
			return reviewService.leave(productId, data)
		},
		onSuccess: () => {
			if (productId) {
				queryClient.invalidateQueries({ queryKey: ['product', productId] })
				queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
			}
		}
	})

	const onSubmit = async (data: ReviewFormValues) => {
		try {
			if (isLoggedIn) {
				mutate(data)
				setOpen(false)
				form.reset()
				toast.error('Review successfully placed!', {
					icon: '✅'
				})
			} else {
				toast.error('log in to system to create review', {
					icon: '❌'
				})
			}
		} catch (err) {
			console.log(err)
			toast.error('Failed to create review', {
				icon: '❌'
			})
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Submit Review</DialogTitle>
				</DialogHeader>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Controller
							control={form.control}
							name='rating'
							render={({ field: { onChange, value }, fieldState }) => (
								<div>
									<div className='flex items-center text-sm gap-0.5'>
										{[1, 2, 3, 4, 5].map(star => (
											<Star
												key={star}
												size={18}
												className={
													star <= (value ?? 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'
												}
												onClick={() => onChange(star)}
											/>
										))}
									</div>
									{fieldState.error?.message && (
										<ErrorText
											className='mt-1'
											text={fieldState.error.message}
										/>
									)}
								</div>
							)}
						/>
						<div className='mt-3'>
							<Textarea
								{...form.register('text', { required: true })} // Подключаем `react-hook-form`
								className='text-base'
								placeholder='Comment to review'
								rows={5}
							/>
							{form.formState.errors.text && (
								<ErrorText
									className='mt-1'
									text={form.formState.errors.text?.message || ''}
								/>
							)}
						</div>
						{/* Переместил кнопку внутрь формы */}
						<div className='flex justify-end mt-3'>
							<Button type='submit'>Send</Button>
						</div>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}
