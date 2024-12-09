import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	if (!event.locals.user) {
		return { user: null };
	}
	return { user: event.locals.user };
}) satisfies LayoutServerLoad;
