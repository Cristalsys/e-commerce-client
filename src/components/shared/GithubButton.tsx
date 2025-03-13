import { FaGithub } from 'react-icons/fa'

import { Button } from '@/components'

const GithubButton = () => {
	const handleLogin = () => {
		window.location.href = 'http://localhost:4200/api/auth/github'
	}

	return (
		<Button
			variant={'outline'}
			onClick={handleLogin}
		>
			<FaGithub className='mr-1 size-4' />
			Github
		</Button>
	)
}

export default GithubButton
