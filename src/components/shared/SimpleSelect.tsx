'use client'

import { useTheme } from 'next-themes'
import ReactSelect, { type Options } from 'react-select'
import makeAnimated from 'react-select/animated'

import { RequiredSymbol } from './require-symbol'
import type { IOption } from '@/types/form.types'

const animatedComponents = makeAnimated()


interface SimpleSelectProps {
	options: Options<IOption>
	selectedOption: IOption | null
	setSelectedOption: (option: IOption | null) => void
}

const SimpleSelect = ({ options, selectedOption, setSelectedOption }: SimpleSelectProps) => {
	const { theme } = useTheme()


	return (
		<div className='w-full'>
			<p className='font-medium mb-2'>
				Size: <RequiredSymbol />
			</p>
			<ReactSelect
				options={options}
				value={selectedOption}
				onChange={option => setSelectedOption(option as { value: string; label: string })} // Обновляем состояние при выборе
				components={animatedComponents}
				isClearable
				className='custom-react-select'
				styles={{
					control: (base, state) => ({
						...base,
						backgroundColor: theme === 'dark' ? '#1C211D' : '#FFFFFF', 
						borderColor: state.isFocused
							? '#1C4632'
							: theme === 'dark'
								? '#374151' 
								: '#D1D5DB', 
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
							backgroundColor: isSelected
								? '#1C4632' 
								: 'transparent' 
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
		</div>
	)
}

export default SimpleSelect
