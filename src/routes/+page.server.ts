import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';

export const load = (async (event) => {
	const todos = await db.select().from(todo);
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
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

		return redirect(302, '/demo/lucia/login');
	},
	create: async ({ cookies, request }) => {
		const data = await request.formData();
		const text = data.get('text');
		if (typeof text === 'string') {
			await db.insert(todo).values({ text });
		} else {
			throw error(400, 'Invalid text value for create');
		}
	},
	delete: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (!id) {
			throw error(400, 'Invalid id value for delete');
		}
		await db.delete(todo).where(eq(todo.id, Number(id)));
	},
	updated: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const text = data.get('text');
		if (!id || !text) {
			throw error(400, 'Invalid id or text for update');
		}
		await db
			.update(todo)
			.set({ text: String(text) })
			.where(eq(todo.id, Number(id)));
	}
};
