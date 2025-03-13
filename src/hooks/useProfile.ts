import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'
import type { IFullUser } from '@/types/user.types'

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['get-profile'],
		queryFn: () => userService.getProfile(),
		select: ({ data }) => data
	})

	return { profile: data || ({} as IFullUser), isLoading }
}
