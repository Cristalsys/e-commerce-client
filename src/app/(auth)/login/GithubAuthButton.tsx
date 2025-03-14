import { Github } from 'lucide-react'

import { Button } from '@/components'

const GithubLoginButton = () => {
	const handleLogin = () => {
		window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/github`
	}

	return (
		<Button
			variant={'outline'}
			onClick={handleLogin}
		>
			<Github className='mr-2 size-4' />
			Github
		</Button>
	)
}

export default GithubLoginButton
