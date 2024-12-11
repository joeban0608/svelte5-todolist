import * as auth from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { globalDb } from '$lib/server/db';
import { sql } from 'drizzle-orm';
import { todo, user } from '$lib/server/db/schema';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	try {
		const result = await globalDb.query.todo.findMany({
			orderBy: (todo, { asc, desc }) => [desc(todo.id)],
			extras: {
				extra_lower_text: sql`lower(${todo.text})`.as('extra_lower_text'),
				extra_concat_id_and_text: sql`concat(${todo.id}, '_',${todo.text})`.as(
					'extra_concat_id_and_text'
				),
				extra_text_length: sql`length(${todo.text})`.as('extra_text_length')
			}
		});
		return {
			todos: result
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
