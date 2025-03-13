'use client'

import { ExternalLink, Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/ui/alert-dialog'
import { Button } from '@/ui/button'

import type { IListItem } from './admin-list'

interface Props extends Pick<IListItem, 'editUrl' | 'viewUrl'> {
	removeHandler?: (id: string) => void
}

export const AdminActions: React.FC<Props> = ({ editUrl, removeHandler, viewUrl }) => {
	const { push } = useRouter()

	return (
		<div className='flex items-center justify-end'>
			{viewUrl && (
				<Button
					variant={'ghost'}
					className='w-8 h-8'
					onClick={() => push(viewUrl)}
				>
					<ExternalLink size={2} />
				</Button>
			)}
			{editUrl && (
				<Button
					variant={'ghost'}
					className='w-8 h-8'
					onClick={() => push(editUrl)}
				>
					<Pencil size={2} />
				</Button>
			)}
			{removeHandler && (
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							variant='ghost'
							className='w-8 h-8'
						>
							<Trash size={16} />
						</Button>
					</AlertDialogTrigger>

					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. Data will be deleted forever.
							</AlertDialogDescription>
						</AlertDialogHeader>

						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={() => removeHandler('')}>delete</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	)
}
