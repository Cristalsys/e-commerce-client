import type { ChangeEvent, FC } from 'react'

import { AdminCreateButton } from './admin-create-button'
import { SearchField } from './search-field'

interface IAdminHeader {
	onClick?: () => void
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({ onClick, searchTerm, handleSearch }) => {
	return (
		<div className='flex items-center justify-between mt-2'>
			<SearchField
				searchTerm={searchTerm}
				handleSearch={handleSearch}
			/>
			{onClick && <AdminCreateButton onClick={onClick} />}
		</div>
	)
}

export default AdminHeader
