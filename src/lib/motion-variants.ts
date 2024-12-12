export const dropdownVariants = {
	closed: {
		scaleY: 0,
		opacity: 0,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
	open: {
		scaleY: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: "easeOut",
			staggerChildren: 0.07,
			delayChildren: 0.12,
		},
	},
};

export const itemVariants = {
	closed: {
		opacity: 0,
		y: 20,
	},
	open: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.18,
			ease: "easeInOut",
		},
	},
};