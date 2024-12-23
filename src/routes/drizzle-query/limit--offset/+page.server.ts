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
		const limit5WithUserName = await globalDb.query.todo.findMany({
			limit: 5,
			with: {
				user: {
					columns: {
						username: true
					}
				}
			}
		});
		const limit3Offset5WithUserName = await globalDb.query.todo.findMany({
			offset: 2, // offset 只能在最 top level; offset 2 : 跳过 2 開始，所以是從 3 開始
			limit: 5,
			with: {
				user: {
					columns: {
						username: true
					}
				}
			}
		});

		return {
			limit5WithUserName,
			limit3Offset5WithUserName
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
