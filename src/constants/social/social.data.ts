import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'

import type { ISocialItem } from './social.types'

export const SOCIAL_DATA: ISocialItem[] = [
	{
		icon: FaFacebookF,
		link: 'https://www.facebook.com/',
		title: 'facebook'
	},
	{
		icon: FaInstagram,
		link: 'https://www.instagram.com/',
		title: 'instagram'
	},
	{
		icon: FaTwitter,
		link: 'https://twitter.com/',
		title: 'twitter'
	}
]
