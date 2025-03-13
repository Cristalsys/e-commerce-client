import { instance } from '@/api/axios'

import type { IFullUser, IUser, IUserEditInput } from '@/types/user.types'

class UserService {
	private _USER = '/users'

	getAll(searchTerm?: string) {
		return instance.get<IUser[]>(`${this._USER}`, {
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	}

	getProfile() {
		return instance.get<IFullUser>(`${this._USER}/profile`)
	}

	updateProfile(formData: FormData) {
		return instance.put<IUser>(`${this._USER}/profile`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data' // Убедитесь, что вы устанавливаете правильный заголовок
			}
		})
	}

	toggleFavorite(productId: string) {
		return instance.patch<IUser>(`${this._USER}/profile/favorites/${productId}`)
	}

	getById(id: string) {
		return instance.get<IUser>(`${this._USER}/by-id/${id}`)
	}

	update(id: string, data: IUserEditInput) {
		return instance.put<IUser>(`${this._USER}/${id}`, data)
	}

	delete(id: string) {
		return instance.delete<string>(`${this._USER}/${id}`)
	}
}

export const userService = new UserService()
