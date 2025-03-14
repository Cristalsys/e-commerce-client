import { FaGoogle } from 'react-icons/fa'

import { Button } from '@/components'

const GoogleLoginButton = () => {
	const handleLogin = () => {
		window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google`
	}

	return (
		<Button
			variant={'outline'}
			onClick={handleLogin}
		>
			<FaGoogle className='mr-2 size-4' />
			Google
		</Button>
	)
}

export default GoogleLoginButton
