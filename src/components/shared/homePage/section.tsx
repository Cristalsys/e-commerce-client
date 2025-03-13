import React from 'react'

import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const Section: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
	return <div className={cn('pt-20 pb-4', className)}>{children}</div>
}
