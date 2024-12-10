export function firstWordUpperCaseAndJoinSpace(link: string | null) {
	if (!link || !link.split('/').pop()) return '';
	const linkPop = link.split('/').pop() as string;
	return linkPop
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
