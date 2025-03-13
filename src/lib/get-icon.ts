import { type LucideIcon, SendHorizontal, Star, User, Wallet } from 'lucide-react'

export const getIcon = (id: number): LucideIcon => {
	switch (id) {
		case 1:
		default:
			return SendHorizontal
		case 2:
			return Star
		case 3:
			return User
		case 4:
			return Wallet
	}
}
