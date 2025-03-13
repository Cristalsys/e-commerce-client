import Cookies from 'js-cookie'

import { clearAuthData, setAuthData } from '@/store/auth.slice'

import { axiosClassic } from '@/api/axios'

import { store } from '@/store'
import type { IAuthData } from '@/types/auth-form.types'
import { EnumTokens } from '@/types/auth.types'
import type { IUser } from '@/types/user.types'

interface IAuthResponse {
	user: IUser
	accessToken: string
}

class AuthService {
	private _AUTH = '/auth'

	async main(type: 'login' | 'register', data: IAuthData) {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/${type}`, data, {
			withCredentials: true
		})

		if (response.data.accessToken) {
			this._saveTokenStorage(response.data.accessToken)
			store.dispatch(setAuthData(response.data))
		}

		return response
	}

	async initializeAuth() {
		const initialStore = store.getState().auth
		if (initialStore.user) return

		try {
			await this.getNewTokens()
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			store.dispatch(clearAuthData())
		}
	}

	// CLIENT
	async getNewTokens() {
		try {
			const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/access-token`, {
				withCredentials: true
			})

			if (response.data.accessToken) {
				this._saveTokenStorage(response.data.accessToken)

				store.dispatch(setAuthData(response.data))
			}

			return response
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			return null
		}
	}

	async logout() {
		const response = await axiosClassic.post<boolean>(`${this._AUTH}/logout`)

		if (response.data) {
			this.removeFromStorage()
			clearAuthData()
		}

		return response
	}

	private _saveTokenStorage(accessToken: string) {
		// const isProduction = process.env.NODE_ENV === 'production'
		// const domain = isProduction ? '.e-commerce-client-opal.vercel.app' : 'localhost'

		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			// domain,
			//1h
			expires: 1 / 24,
			sameSite: 'strict',
			secure: true
		})
	}

	removeFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
		store.dispatch(clearAuthData())
	}
}

export const authService = new AuthService()
