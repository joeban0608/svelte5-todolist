import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { updated } from '$app/stores';

export const load = (async () => {
	const todos = await db.select().from(todo);

	if (!todos?.length) {
		return {
			todos: []
		};
		// error(404, 'todo not found');
	}
	console.log('todos', todos);
	return {
		todos
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
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
