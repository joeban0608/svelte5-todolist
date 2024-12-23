import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import * as auth from '$lib/server/auth';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
	const userId = event.locals.user.id;
	const todos = await db.select().from(todo).where(eq(todo.userId, userId));

	if (!todos?.length) {
		return {
			todos: []
		};
		// error(404, 'todo not found');
	}
	return {
		user: event.locals.user,
		todos
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/login');
	},
	create: async ({ cookies, request }) => {
		const data = await request.formData();
		const text = data.get('text');
		const userId = data.get('userId');
		if (typeof text === 'string' && typeof userId === 'string') {
			await db.insert(todo).values({ text, userId });
		} else {
			throw error(400, 'Invalid text value for create');
		}
	},
	delete: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const userId = data.get('userId');

		if (!id) {
			throw error(400, 'Invalid todo id for delete');
		}
		if (!userId) {
			throw error(400, 'Invalid user id for delete');
		}
		await db.delete(todo).where(eq(todo.id, Number(id)));
	},
	updated: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const text = data.get('text');
		const userId = data.get('userId');

		if (!id) {
			throw error(400, 'Invalid todo id for update');
		}
		if (!text) {
			throw error(400, 'Invalid todo text for update');
		}
		if (!userId) {
			throw error(400, 'Invalid userId text for update');
		}

		await db
			.update(todo)
			.set({ text: String(text) })
			.where(and(eq(todo.id, Number(id)), eq(todo.userId, String(userId))));
	}
};
