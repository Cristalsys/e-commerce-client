'use client'

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Input } from '../../ui/input'
import { ClearButton } from '../clear-button'
import { ErrorText } from '../error-text'
import { RequiredSymbol } from '../require-symbol'
import { ShowPasswordButton } from '../show-password-button'

import { cn } from '@/lib/utils'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	required?: boolean
	className?: string
	inputClassName?: string
	isPassword?: boolean
}

export const FormInput: React.FC<Props> = ({
	className,
	inputClassName,
	name,
	label,
	required,
	isPassword,
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
		setValue(name, '', { shouldValidate: true })
	}

	const [showPassword, setShowPassword] = useState(false)

	const onClickHandler = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className='relative'>
				{!isPassword ? (
					<>
						<Input
							className={cn('h-9 text-md', inputClassName)}
							{...register(name)}
							{...props}
						/>
						{value && <ClearButton onClick={onClickClear} />}
					</>
				) : (
					<>
						<Input
							className={cn('h-9 text-md', inputClassName)}
							{...register(name)}
							type={showPassword ? 'text' : 'password'}
							{...props}
						/>

						<ShowPasswordButton
							onClick={onClickHandler}
							showPassword={showPassword}
						/>
					</>
				)}
			</div>

			{errorText && (
				<ErrorText
					text={errorText}
					className='mt-2'
				/>
			)}
		</div>
	)
}
