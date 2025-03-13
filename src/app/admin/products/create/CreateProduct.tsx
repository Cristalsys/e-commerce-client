'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Save, X } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'

import SimpleSelect from '@/components/shared/SimpleSelect'
import { Select } from '@/components/shared/select'
import { Title } from '@/components/shared/title'

import { mapProductSize } from '@/constants/product'

import { useAdminGetAllCategories } from '@/hooks/useAdminGetAllCategories'
import { useAdminProductCreate } from '@/hooks/useAdminProductCreate'

import { type TFormProductValues, formProductSchema } from '@/utils/schemas/products/schema'

import {
	Button,
	FormInput,
	FormTextarea,
	Input,
	RequiredSymbol,
	Separator,
	UploadFieldPRoduct
} from '@/components'
import { convertPrice } from '@/lib/convert-price'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const CreateProduct: React.FC<Props> = ({ className }) => {
	const { onSubmit } = useAdminProductCreate()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [items, setItems] = useState<{ size: string; price: number }[]>([])
	const [price, setPrice] = useState(0)
	const { categories } = useAdminGetAllCategories()
	const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(
		null
	)

	const form = useForm<TFormProductValues>({
		resolver: zodResolver(formProductSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			description: '',
			imageUrls: [''],
			categoryId: '',
			items: []
		}
	})

	const sizes = [
		{
			label: 'Small',
			value: '20'
		},
		{
			label: 'Medium',
			value: '30'
		},
		{
			label: 'Large',
			value: '40'
		}
	]

	const handleRemoveItem = (indexToRemove: number) => {
		remove(indexToRemove)
		setItems(prevItems => prevItems.filter((_, index) => index !== indexToRemove))
	}

	function handlerAddClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		if (!selectedOption) return

		const isSizeExists = fields.some(item => item.size === Number(selectedOption.value))
		if (isSizeExists) {
			form.setError('items', { type: 'manual', message: 'this size is already added' })
			return
		}

		append({ size: Number(selectedOption.value) as 20 | 30 | 40, price })

		form.clearErrors('items')
		setPrice(0)
		setSelectedOption(null)
	}

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	})

	const handleSubmit = (data: TFormProductValues) => {
		if (fields.length === 0) {
			form.setError('items', { type: 'manual', message: 'add one size and price' })
			return
		}

		form.clearErrors('items')
		onSubmit(data)
	}

	return (
		<div className={className}>
			<FormProvider {...form}>
				<form
					className=''
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<div className='grid gap-5 w-full'>
						<FormInput
							name='name'
							label='Name'
							required
						/>
						<div>
							<div className='font-medium mb-2'>
								<div>Description:</div>
							</div>
							<FormTextarea
								name='description'
								className='text-base'
								rows={5}
							/>
						</div>
						<Controller
							name='categoryId'
							control={form.control}
							rules={{
								required: 'Enter Category'
							}}
							render={({ field, fieldState: { error } }) => {
								return (
									<Select
										error={error}
										field={field}
										placeholder='Categories'
										options={categories || []}
										required
										isMulti={false}
									/>
								)
							}}
						/>
						<Controller
							name='imageUrls'
							control={form.control}
							defaultValue={[]}
							render={({ field: { value, onChange }, fieldState: { error } }) => (
								<UploadFieldPRoduct
									onChange={onChange}
									value={value}
									error={error}
									folder='products'
									placeholder='Image'
								/>
							)}
							rules={{
								required: 'Image is required'
							}}
						/>
					</div>
					<Separator className='my-6' />
					<div className='mb-4 grid grid-cols-2 items-center gap-5'>
						<SimpleSelect
							options={sizes || []}
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
						/>
						<div>
							<div className='font-medium mb-2'>
								<div>
									Price: <RequiredSymbol />
								</div>
							</div>
							<Input
								className={cn('h-9 text-md')}
								value={price}
								onChange={e => {
									setPrice(Number(e.target.value))
								}}
							/>
						</div>
					</div>
					<div className='flex justify-end'>
						<Button
							onClick={handlerAddClick}
							className='text-base '
						>
							<Plus />
							Add
						</Button>
					</div>

					<div>
						{fields.length > 0 && <Title size='sm'>Added Items:</Title>}
						{fields.map((item, index) => (
							<div
								key={index}
								className='flex gap-2 mt-2'
							>
								<p>
									<b>Size:</b> {mapProductSize[item.size as keyof typeof mapProductSize]}
								</p>
								<p>
									<b>Price:</b> {convertPrice(item.price)}
								</p>
								<X
									onClick={() => handleRemoveItem(index)}
									className='cursor-pointer'
								/>
							</div>
						))}

						{form.formState.errors.items && (
							<p className='text-red-500 text-xs mt-2'>{form.formState.errors.items.message}</p>
						)}
					</div>
					<Separator className='my-6' />
					<Button
						disabled={form.formState.isSubmitting}
						className='text-base w-32'
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
