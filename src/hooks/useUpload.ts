import { useMutation } from '@tanstack/react-query'
import { type ChangeEvent, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/file.service'

type TypeUpload = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadImage: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),
		onSuccess({ data }) {
			onChange(data.map(file => file.url))
		},
		onError() {
			toast.error('Error during loading file')
		}
	})

	const uploadImage = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)

			const files = event.target.files
			console.log('selected files', files)

			if (files?.length) {
				const fileArray = Array.from(files)

				const formData = new FormData()
				fileArray.forEach(file => formData.append('image', file))
				await mutateAsync(formData)

				setTimeout(() => {
					setIsLoading(false)
				}, 2000)
			}
		},
		[mutateAsync]
	)

	return useMemo(
		() => ({
			uploadImage,
			isLoading
		}),
		[uploadImage, isLoading]
	)
}
