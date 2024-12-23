import * as auth from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { globalDb } from '$lib/server/db';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
	try {
		const columnsKeyTrue = await globalDb.query.user.findMany({
			columns: {
				id: true,
				username: true
			},
			with: {
				todo: true
			}
		});
		const columnsKeyFalse = await globalDb.query.user.findMany({
			columns: {
				passwordHash: false
			},
			with: {
				todo: true
			}
		});
		const columnsNoKey = await globalDb.query.user.findMany({
			columns: {},
			with: {
				todo: true
			}
		});
		return {
			users: columnsKeyTrue,
			users2: columnsKeyFalse,
			users3: columnsNoKey
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

		return redirect(302, '/login');
	}
};
