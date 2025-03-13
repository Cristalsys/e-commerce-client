import { Plus } from 'lucide-react'
import React from 'react'

import { Button } from '@/ui/button'

interface Props {
	onClick: () => void
	className?: string
}

export const AdminCreateButton: React.FC<Props> = ({ onClick }) => {
	return (
		<Button onClick={onClick}>
			<Plus className='mr-2' />
			Create
		</Button>
	)
}
