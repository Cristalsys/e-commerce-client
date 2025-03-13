import type { InputHTMLAttributes } from 'react'
import type { ControllerRenderProps, FieldError } from 'react-hook-form'
import type { Options } from 'react-select'

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	error?: FieldError
}

export interface IOption {
	label: string
	value: string
}

export interface ISelect extends IField {
	options: Options<IOption>
	isMulti?: boolean
	required?: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
}
