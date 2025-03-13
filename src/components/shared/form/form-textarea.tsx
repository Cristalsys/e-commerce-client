'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Textarea } from '@/ui/textarea'

import { ClearButton } from '../clear-button'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string
	name: string
	label?: string
	required?: boolean
	rows: number
}

export const FormTextarea: React.FC<Props> = ({
	className,
	name,
	rows,
	label,
	required,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message as string

	const onClickClear = () => {
		setValue(name, '')
	}

	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <span className='text-red-500'>*</span>}
				</p>
			)}

			<div className='relative'>
				<Textarea
					rows={rows}
					className='text-md' // ✅ Минимальная высота, но расширяется при вводе
					{...register(name)}
					{...props}
				/>

				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && <p className='text-red-500 text-sm mt-2'>{errorText}</p>}
		</div>
	)
}
