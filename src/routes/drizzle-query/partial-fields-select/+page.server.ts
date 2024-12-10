import * as auth from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { globalDb } from '$lib/server/db';
import { user } from '$lib/server/db/schema';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	try {
		const result = await globalDb.query.user.findMany({
			columns: {
				id: true,
				username: true
			},
			with: {
				todo: true
			}
		});
		const result2 = await globalDb.query.user.findMany({
			columns: {
				passwordHash: false
			},
			with: {
				todo: true
			}
		});
		const result3 = await globalDb.query.user.findMany({
			columns: {},
			with: {
				todo: true
			}
		});
		return {
			users: result,
			users2: result2,
			users3: result3
		};
	} catch (error) {
		console.error('error', error);
		return { error: 'query globalDb db was wrong.' };
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/demo/lucia/login');
	}
};
