import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { TFormPromocodeValues } from '@/utils/schemas/promocode/schema'

import { promocodeService } from '@/services/promode.service'
import type { ICreatePromocode } from '@/types/promocode.types'

export function useAdminPromocodeCreate() {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create promocode'],
		mutationFn: (data: ICreatePromocode) => promocodeService.create(data),
		onSuccess() {
			toast.success('Promocode is created')
			queryClient.invalidateQueries({ queryKey: ['get promocode for admin dashboard'] })
		},
		onError() {
			toast.error('Error during creating')
		}
	})

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onSubmit: SubmitHandler<TFormPromocodeValues> = async data => {
		router.push('/admin/promocode')
		const promocode: ICreatePromocode = {
			...data,
			expiresAt: new Date(data.expired) // Adjust the property name if necessary
		}
		await createAsync(promocode)
	}

	return useMemo(
		() => ({
			onSubmit
		}),
		[onSubmit]
	)
}
