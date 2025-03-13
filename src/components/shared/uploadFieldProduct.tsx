'use client'

import Image from 'next/image'
import React, { type CSSProperties } from 'react'
import type { FieldError } from 'react-hook-form'

import { useUpload } from '@/hooks/useUpload'

import { RequiredSymbol } from './require-symbol'

export interface IUploadField {
	className?: string
	folder?: string
	value?: string[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
}

export const UploadFieldPRoduct: React.FC<IUploadField> = ({
	placeholder,
	error,
	style,
	folder,
	onChange,
	value = []
}) => {
	const { uploadImage } = useUpload(onChange, folder)

	return (
		<div
			className='relative'
			style={style}
		>
			<div className='flex'>
				<label className='block'>
					<span className='block mb-2.5'>
						{placeholder} <RequiredSymbol />
					</span>
					<input
						type='file'
						multiple
						onChange={uploadImage}
						className='block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white transition-opacity hover:file:bg-primary/90'
					/>
					{error && <div className='text-red-500 text-xs mt-2 mb-2'>{error.message}</div>}
				</label>

				<div className='flex gap-2 items-center flex-wrap -ml-12'>
					{value?.map(url =>
						url ? (
							<div
								key={url}
								className='relative w-[70px] h-[70px] flex justify-between items-center  overflow-hidden'
							>
								<Image
									src={url}
									alt='Uploaded Image'
									width={50}
									height={50}
									className='object-cover rounded-md '
								/>
							</div>
						) : null
					)}
				</div>
			</div>
		</div>
	)
}
