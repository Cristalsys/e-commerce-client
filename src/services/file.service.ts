import { instance } from '@/api/axios'

interface IFile {
	url: string
	name: string
}

class FileService {
	private _FILES = '/media'

	async upload(file: FormData, folder?: string) {
		return instance.post<IFile[]>(this._FILES, file, {
			params: {
				folder
			},
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}
}

export const fileService = new FileService()
