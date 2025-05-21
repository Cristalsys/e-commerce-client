'use client'

import * as motion from 'framer-motion/m'

interface AnimateOnScrollProps {
	children: React.ReactNode
	delay?: number
	direction?: 'top' | 'bottom' | 'left' | 'right'
}

const directionVariants = {
	top: { y: -60, opacity: 0 },
	bottom: { y: 60, opacity: 0 },
	left: { x: -60, opacity: 0 },
	right: { x: 60, opacity: 0 }
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
	children,
	delay = 0,
	direction = 'top'
}) => {
	return (
		<motion.div
			initial={directionVariants[direction]}
			animate={{ x: 0, y: 0, opacity: 1 }}
			transition={{ duration: 0.8, delay: delay / 1000 }}
			viewport={{ once: false, amount: 0.2 }}
		>
			{children}
		</motion.div>
		//   <motion.div
		//   initial={directionVariants[direction]}
		//   whileInView={{ x: 0, y: 0, opacity: 1 }}
		//   transition={{ duration: 0.8, delay: delay / 1000 }}
		//   viewport={{ once: false, amount: 0.2 }} // 👈 Показывает анимацию каждый раз при скролле
		// >
		//   {children}
		// </motion.div>
	)
}
