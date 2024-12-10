export function firstWordUpperCaseAndJoinSpace(link: string | null) {
	if (!link || !link.split('/').pop()) return '';
	const linkPop = link.split('/').pop() as string;
	if (linkPop.includes('--')) {
		console.log('linkPop', linkPop);
		return linkPop
			.replace('--', ' & ')
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	return linkPop
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
