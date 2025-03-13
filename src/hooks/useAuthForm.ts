import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import type { SubmitHandler, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { PAGE } from '@/config/public-page.config'

import { authService } from '@/services/auth.service'
import type { IAuthData, IAuthForm } from '@/types/auth-form.types'

export function useAuthForm(type: 'login' | 'register', reset: UseFormReset<IAuthForm>) {
	const router = useRouter()

	const [isPending, startTransition] = useTransition()

	const { mutateAsync, isPending: isAuthPending } = useMutation({
		mutationKey: [type],
		mutationFn: (data: IAuthData) => authService.main(type, data)
	})

	const onSubmit: SubmitHandler<IAuthForm> = async data => {
		toast.promise(mutateAsync(data), {
			loading: 'Loading...',
			success: () => {
				startTransition(() => {
					reset()
					router.push(`${PAGE.HOME}`)
				})

				return `Successful ${type}!`
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			error: (e: any) => {
				if (axios.isAxiosError(e)) {
					return e.response?.data?.message
				}
			}
		})
	}

	const isLoading = isPending || isAuthPending

	return {
		onSubmit,
		isLoading
	}
}
