'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Save } from 'lucide-react'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { Calendar } from '@/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'

import { useAdminPromocodeCreate } from '@/hooks/useAdminPromocodeCreate'

import { type TFormPromocodeValues, formPromocodeSchema } from '@/utils/schemas/promocode/schema'

import { Button, FormInput } from '@/components'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const CReatePRomocode: React.FC<Props> = ({ className }) => {
	const { onSubmit } = useAdminPromocodeCreate()

	const form = useForm<TFormPromocodeValues>({
		resolver: zodResolver(formPromocodeSchema),
		mode: 'onChange',
		defaultValues: {
			code: '',
			discount: 1,
			expired: new Date()
		}
	})

	return (
		<div className={className}>
			<FormProvider {...form}>
				<form
					className=''
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className='grid gap-5 w-full'>
						<FormInput
							name='code'
							label='Code'
							required
						/>
						<FormInput
							name='discount'
							label='Discount'
							required
						/>
						<Controller
							name='expired'
							control={form.control}
							render={({ field, fieldState: { error } }) => (
								<div>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant='outline'
												className={cn(
													'w-full justify-start text-left font-normal',
													!field.value && 'text-muted-foreground',
													error && 'border-red-500'
												)}
											>
												<CalendarIcon />
												{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
											</Button>
										</PopoverTrigger>
										<PopoverContent
											className='w-auto p-0'
											align='start'
										>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>

									{error && <p className='text-red-500 text-xs mt-1'>{error.message}</p>}
								</div>
							)}
						/>
					</div>
					<Button
						disabled={form.formState.isSubmitting}
						className='text-base w-32 mt-6'
						type='submit'
					>
						<Save />
						Save
					</Button>
				</form>
			</FormProvider>
		</div>
	)
}
