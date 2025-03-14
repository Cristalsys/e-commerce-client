import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'

import { PAGE } from './config/public-page.config'
// import { protectLoginPages } from './server-actions/middlewares/protect-login.middleware'
// import { protectProfile } from './server-actions/middlewares/protect-profile.middleware'
import { EnumRole } from './types/user.types'

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('accessToken')?.value

	const url = new URL(request.url)
	const pathname = url.pathname

	// if (
	// 	pathname.includes('/profile') ||
	// 	pathname.includes('/favorites') ||
	// 	pathname.includes('/orders')
	// ) {
	// 	return protectProfile(request)
	// }

	// if (pathname.includes(PAGE.LOGIN) || pathname.includes(PAGE.REGISTER)) {
	// 	return protectLoginPages(request)
	// }

	if (!token) {
		if (
			pathname.startsWith('/admin') ||
			pathname.startsWith('/profile') ||
			pathname.startsWith('/favorites') ||
			pathname.startsWith('/orders')
		) {
			return Response.redirect(new URL(PAGE.HOME, request.url), 302)
		}
		return
	}

	if (token) {
		try {
			const secret = new TextEncoder().encode(process.env.JWT_SECRET) // Ваш секретный ключ
			const { payload } = await jwtVerify(token, secret)
			if (pathname.includes(PAGE.LOGIN) || pathname.includes(PAGE.REGISTER)) {
				return Response.redirect(new URL(PAGE.HOME, request.url), 302)
			}
			if (pathname.includes('/admin') && String(payload.role) !== String(EnumRole.ADMIN)) {
				return Response.redirect(new URL(PAGE.HOME, request.url), 302)
			}
		} catch (error) {
			console.error('Token verification failed:', error)
		}
	}
}

export const config = {
	matcher: [
		'/login/:path*',
		'/register/:path*',
		'/profile/:path*',
		'/favorites/:path*',
		'/orders/:path*',
		'/admin/:path*'
	]
}
