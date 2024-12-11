import * as auth from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { todo, user } from '$lib/server/db/schema';
import { eq, exists, gt, gte, lt, lte, ne, notExists } from 'drizzle-orm';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	try {
		const todosEq = await db.select().from(todo).where(eq(todo.id, 3));
		const todosNe = await db.select().from(todo).where(ne(todo.id, 3));
		const todosGt = await db.select().from(todo).where(gt(todo.id, 3));
		const todosGte = await db.select().from(todo).where(gte(todo.id, 3));
		const todosLt = await db.select().from(todo).where(lt(todo.id, 3));
		const todosLte = await db.select().from(todo).where(lte(todo.id, 3));
		const query = db.select().from(user);
		const todoExistsInUser = await db.select().from(todo).where(exists(query));
		const todoNoExistsInUser = await db.select().from(todo).where(notExists(query));
		console.log('todoNoExistsInUser', todoNoExistsInUser);
		return {
			todosEq,
			todosNe,
			todosGt,
			todosGte,
			todosLt,
			todosLte,
			todoExistsInUser,
			todoNoExistsInUser
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
