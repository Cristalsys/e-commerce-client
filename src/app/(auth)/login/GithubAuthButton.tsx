import { Github } from 'lucide-react'

import { Button } from '@/components'

const GithubLoginButton = () => {
	const handleLogin = () => {
		window.location.href = 'http://localhost:4200/api/auth/github'
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
