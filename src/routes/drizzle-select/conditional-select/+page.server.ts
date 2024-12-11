import * as auth from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';
import { boolean } from 'drizzle-orm/mysql-core';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	try {
		async function selectUsers({
			withName = true,
			withId = true
		}: {
			withName?: boolean;
			withId?: boolean;
		} = {}) {
			return db
				.select({
					...(withName ? { name: user.username } : {}),
					...(withId ? { id: user.id } : {})
				})
				.from(user);
		}
		const result = await selectUsers({ withId: false });
		return {
			users: result
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
