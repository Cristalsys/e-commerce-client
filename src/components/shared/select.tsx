import { useTheme } from 'next-themes'
import React from 'react'
import ReactSelect, { type OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated'

import { RequiredSymbol } from './require-symbol'
import type { IOption, ISelect } from '@/types/form.types'

const animatedComponents = makeAnimated()

export const Select: React.FC<ISelect> = ({
	placeholder,
	error,
	isMulti,
	options,
	field,
	required,
	isLoading
}) => {
	const { theme } = useTheme()

	const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter(option => field.value.indexOf(option.value) >= 0)
				: options.find(option => option.value === field.value)
		} else {
			return isMulti ? [] : ''
		}
	}

	return (
		<div className='relative mb-8 animate-fade'>
			<label>
				{placeholder && (
					<p className='font-medium mb-2'>
						{placeholder} {required && <RequiredSymbol />}
					</p>
				)}
				<ReactSelect
					classNamePrefix='custom-select'
					placeholder=''
					options={options}
					value={getValue()}
					onChange={onChange}
					isMulti={isMulti}
					components={animatedComponents}
					isLoading={isLoading}
					className='custom-react-select'
					styles={{
						control: (base, state) => ({
							...base,
							backgroundColor: theme === 'dark' ? '#1C211D' : '#FFFFFF',
							borderColor: state.isFocused ? '#1C4632' : theme === 'dark' ? '#374151' : '#D1D5DB',
							boxShadow: state.isFocused ? '0 0 0 1px #1C4632' : 'none',
							'&:hover': {
								borderColor: '#1C4632'
							},
							color: theme === 'dark' ? '#FFFFFF' : '#000000'
						}),
						menu: base => ({
							...base,
							backgroundColor: theme === 'dark' ? '#1C211D' : '#FFFFFF',
							border: `1px solid ${theme === 'dark' ? '#374151' : '#1C4632'}`,
							borderRadius: '6px',
							boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
						}),
						option: (base, { isFocused, isSelected }) => ({
							...base,
							backgroundColor: isSelected
								? '#1C4632'
								: isFocused
									? theme === 'dark'
										? '#2D3A32'
										: '#A3B7A1'
									: theme === 'dark'
										? '#1C211D'
										: '#FFFFFF',

							color: isSelected ? '#FFFFFF' : theme === 'dark' ? '#D1D5DB' : '#000000',
							cursor: 'pointer',
							transition: 'background-color 0.2s ease',

							'&:active': {
								backgroundColor: isSelected ? '#1C4632' : 'transparent'
							}
						}),
						singleValue: base => ({
							...base,
							color: theme === 'dark' ? '#FFFFFF' : '#000000'
						}),
						multiValue: base => ({
							...base,
							backgroundColor: '#1C4632',
							color: '#FFFFFF',
							borderRadius: '4px'
						}),
						multiValueLabel: base => ({
							...base,
							color: '#FFFFFF'
						}),
						multiValueRemove: base => ({
							...base,
							color: '#FFFFFF',
							'&:hover': {
								backgroundColor: '#A3B7A1',
								color: '#1C4632'
							}
						})
					}}
				/>
			</label>
			{error && <div className='text-red-500  text-xs mt-2'>{error.message}</div>}
		</div>
	)
}
