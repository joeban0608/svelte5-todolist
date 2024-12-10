
export function firstWordUpperCaseAndJoinSpace(link: string | null) {
	return (link ?? '')
		.split('/')
		.pop()
		?.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
