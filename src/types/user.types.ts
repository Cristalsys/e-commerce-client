// import type { IOrder } from './order.types'
import type { IOrder } from './order.types'
import type { IProduct } from './product.types'

export interface IUser {
	id: string
	email: string
	name: string
	avatarPath: string
	phone: string
	role: EnumRole
}
export type IUserEditInput = Pick<IUser, 'name' | 'email' | 'role' | 'phone'>

export interface IFullUser extends IUser {
	favorites: IProduct[]
	orders: IOrder[]
}

export enum EnumRole {
	USER = 'USER',
	ADMIN = 'ADMIN'
}
