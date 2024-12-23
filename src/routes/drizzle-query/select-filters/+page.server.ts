import * as auth from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { globalDb } from '$lib/server/db';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
	const userId = event.locals.user.id;
	try {
		const filterUserWithTodo = await globalDb.query.user.findMany({
			where: (user, { eq }) => eq(user.id, userId),
			with: {
				todo: true
			}
		});
		const filterTodoGreaterThan_3 = await globalDb.query.user.findMany({
			where: (user, { eq }) => eq(user.id, userId),
			with: {
				todo: {
					where: (todo, { gte }) => gte(todo.id, 4)
				}
			}
		});

		return {
			filterUserWithTodo: filterUserWithTodo,
			filterUserTodoGte3: filterTodoGreaterThan_3
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
