export const fadeUp = {
	hidden: { opacity: 0, y: 60 },
	visible: { opacity: 1, y: 0, transition: { duration: 2.5, delay: 0.4 } }
}

export const fadeDown = (delay: number = 0.4) => ({
	hidden: { opacity: 0, y: -60 },
	visible: { opacity: 1, y: 0, transition: { duration: 2.5, delay } }
})

export const fadeLeft = {
	hidden: { opacity: 0, x: -60 },
	visible: { opacity: 1, x: 0, transition: { duration: 2.5, delay: 0.4 } }
}

export const fadeRight = {
	hidden: { opacity: 0, x: 60 },
	visible: { opacity: 1, x: 0, transition: { duration: 2.5, delay: 0.4 } }
}

export const fadeWithInterval = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 1, delay: i * 0.1 }
	})
}
