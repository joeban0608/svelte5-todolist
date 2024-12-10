import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { globalDb } from '$lib/server/db';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	try {
		const result = await globalDb.query.user.findMany({
			with: {
				todo: true
			}
		});
		return {
			users: result
		};
	} catch (error) {
		console.error('error', error);
		return { error: 'query globalDb db was wrong.' };
	}

	// return {};
}) satisfies PageServerLoad;
