'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useCategoryEdit } from '@/hooks/useCategoryEdit'

import { type TFormCategoryValues, formCategorySchema } from '@/utils/schemas/category/schema'

import { Button, FormInput } from '@/components'

interface Props {
	categoryId: string
	className?: string
}

export const CAtegoryEDit: React.FC<Props> = ({ className, categoryId }) => {
	const { category, onSubmit } = useCategoryEdit(categoryId)

	const form = useForm<TFormCategoryValues>({
		resolver: zodResolver(formCategorySchema),
		mode: 'onChange',
		defaultValues: {
			name: category?.name || ''
		}
	})

	useEffect(() => {
		if (category) {
			const currentValues = form.getValues()

			if (currentValues.name !== category?.name) {
				form.reset({
					name: category?.name || ''
				})
			}
		}
	}, [category, form])

	return (
		<div className={className}>
			<FormProvider {...form}>
				<form
					className=''
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className='grid gap-5 w-full mb-4'>
						<FormInput
							name='name'
							label='Name'
							required
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
