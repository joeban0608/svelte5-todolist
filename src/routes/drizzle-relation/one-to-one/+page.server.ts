import * as auth from '$lib/server/auth';
import type { PageServerLoad } from './$types';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { todo } from '$lib/server/db/schema';
import { relations } from 'drizzle-orm';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	return { user: event.locals.user };
	// const usersRelations = relations(todo, ({ one }) => ({
	// 	invitee: one(todo, {
	// 		fields: [todo.id],
	// 		references: [todo.id]
	// 	})
	// }));
	// console.log('usersRelations', usersRelations);
	// return { todos: usersRelations };
	return {};
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
