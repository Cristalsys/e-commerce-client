export interface IAuthData {
	name?: string
	email: string
	password: string
}

export interface IAuthForm extends IAuthData {
	confirmPassword?: string
}
