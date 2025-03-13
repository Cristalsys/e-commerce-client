import type { NextRequest } from 'next/server'

import { getNewTokensByRefresh } from './get-new-tokens-by-refresh'
import { EnumTokens } from '@/types/auth.types'

export async function getTokensFromRequest(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	console.log('Все куки:', request.cookies.getAll())
	console.log('refreshToken:', refreshToken)

	if (!refreshToken) {
		request.cookies.delete(EnumTokens.ACCESS_TOKEN)
		return null
	}

	console.log('Отправляем refreshToken:', refreshToken)
	if (!accessToken) {
		try {
			const data = await getNewTokensByRefresh(refreshToken)
			console.log('Получены новые токены:', data)
			accessToken = data.accessToken
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === 'invalid token') {
					console.log('не валидный токен')
					request.cookies.delete(EnumTokens.ACCESS_TOKEN)
					return null
				}
			}
			return null
		}
	}

	return { accessToken, refreshToken }
}
