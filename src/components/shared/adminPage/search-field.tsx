import { Search } from 'lucide-react'
import React, { type ChangeEvent } from 'react'

import { Input } from '@/ui/input'

interface Props {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SearchField: React.FC<Props> = ({ searchTerm, handleSearch }) => {
	return (
		<div>
			<label className='relative'>
				<Search
					size={24}
					className='absolute left-4 top-1.5 text-gray-500'
				/>
				<Input
					className='rounded-lg py-2 px-12 w-full block'
					type='text'
					placeholder='Search...'
					value={searchTerm}
					onChange={handleSearch}
				/>
			</label>
		</div>
	)
}
