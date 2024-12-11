import * as auth from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { globalDb } from '$lib/server/db';
import { sql } from 'drizzle-orm';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	try {
		const p1 = await globalDb.query.user
			.findMany({
				where: (user, { eq }) => eq(user.username, sql.placeholder('username')),
				with: {
					todo: true
				}
			})
			.prepare('p1');
		const usersWithTodos = await p1.execute({ username: 'rexrex' });
		return {
			users: usersWithTodos
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
