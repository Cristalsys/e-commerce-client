import {
	ChartBarStacked,
	ChartNoAxesColumnIncreasing,
	Heart,
	Logs,
	type LucideIcon,
	Percent,
	ShoppingBasket,
	Star,
	User,
	Wallet
} from 'lucide-react'

export interface ISidebarItem {
	icon: LucideIcon
	label: string
	link: string
}

export const SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: User,
		label: 'Profile',
		link: '/profile'
	},
	{
		icon: Logs,
		label: 'Orders',
		link: '/orders'
	},
	{
		icon: Heart,
		label: 'Favorites',
		link: '/favorites'
	}
]

export const ADMIN_SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: ChartNoAxesColumnIncreasing,
		label: 'Statistics',
		link: '/admin/statistics'
	},
	{
		icon: User,
		label: 'Users',
		link: '/admin/users'
	},
	{
		icon: ShoppingBasket,
		label: 'Products',
		link: '/admin/products'
	},
	{
		icon: Percent,
		label: 'Promocode',
		link: '/admin/promocode'
	},
	{
		icon: ChartBarStacked,
		label: 'Categories',
		link: '/admin/categories'
	},
	{
		icon: Star,
		label: 'Reviews',
		link: '/admin/reviews'
	},
	{
		icon: Wallet,
		label: 'Orders',
		link: '/admin/orders'
	}
]
