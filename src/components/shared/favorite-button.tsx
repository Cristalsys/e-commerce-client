'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

import { useProfile } from '@/hooks/useProfile'

import { userService } from '@/services/user.service'
import { useTypedSelector } from '@/store'

interface Props {
	productId: string
	className?: string
}

export const FavoriteButton: React.FC<Props> = ({ productId, className }) => {
	const { profile } = useProfile()
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: () => userService.toggleFavorite(productId),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get-profile'] })
		}
	})

	const onClickHandler = () => {
		if (isLoggedIn) {
			mutate()
		} else {
			toast.error('Please log in to perform this operation.')
		}
	}

	const isExists = profile?.favorites?.some(favorite => favorite.id === productId)

	return (
		<div className={className}>
			<button onClick={onClickHandler}>
				{isExists ? <Heart className='text-primary fill-current' /> : <Heart />}
			</button>
		</div>
	)
}
