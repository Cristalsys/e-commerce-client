import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { userService } from '@/services/user.service'
import type { IUserEditInput } from '@/types/user.types'

export const useUserEdit = (userId: string) => {
	const router = useRouter()

	const { data: user, isLoading } = useQuery({
		queryKey: ['user', userId],
		queryFn: () => userService.getById(userId),
		select: ({ data }) => data,
		enabled: !!userId
	})

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['update user'],
		mutationFn: (data: IUserEditInput) => userService.update(userId, data),
		onSuccess() {
			toast.success('User is updated')
			queryClient.invalidateQueries({
				queryKey: ['get users for admin dashboard']
			})
		},
		onError() {
			toast.error('Error during updating')
		}
	})

	const onSubmit: SubmitHandler<IUserEditInput> = async data => {
		await mutateAsync(data)
		router.push('/admin/users')
	}

	return { user, onSubmit, isLoading }
}
