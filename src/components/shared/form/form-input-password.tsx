'use client'

import { useState } from 'react'

import { Input } from '../../ui/input'
import { ShowPasswordButton } from '../show-password-button'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string
	disabled?: boolean
	type?: string
	className?: string
}

export const FormInputPassword: React.FC<Props> = ({
	className,
	placeholder,
	disabled,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false)

	const onClickHandler = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className={className}>
			<div className='relative'>
				<Input
					className='h-9'
					placeholder={placeholder}
					disabled={disabled}
					type={showPassword ? 'text' : 'password'}
					{...props}
				/>

				<ShowPasswordButton
					onClick={onClickHandler}
					showPassword={showPassword}
				/>
			</div>
		</div>
	)
}
