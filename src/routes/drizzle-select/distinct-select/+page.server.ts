import * as auth from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { todo, user } from '$lib/server/db/schema';
import { asc, desc, eq, min, sql } from 'drizzle-orm';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	try {
		const result = await db
			// .selectDistinct({ text: todo.text, userId: todo.userId })
			.selectDistinctOn([todo.text])
			.from(todo)
			.where(eq(todo.userId, event.locals.user.id))
			.orderBy(desc(todo.text));
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
