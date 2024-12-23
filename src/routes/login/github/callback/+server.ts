import type { OAuth2Tokens } from 'arctic';
import type { RequestEvent } from '../$types';
import { github } from '$lib/server/oauth';
import {
	createSession,
	generateSessionToken,
	generateUserId,
	setSessionTokenCookie
} from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;
	if (code === null || state === null || storedState === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await github.validateAuthorizationCode(code);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});
	const githubUser = await githubUserResponse.json();
	const githubUserId = githubUser.id;
	const githubUsername = githubUser.login;

	// TODO: Replace this with your own DB query.
	const users = await db.select().from(table.user).where(eq(table.user.githubId, githubUserId));

	const existingUser = users.at(0);

	// if (existingUser) {
	// 	const sessionToken = generateSessionToken();
	// 	const session = await createSession(sessionToken, user.id);
	// 	setSessionTokenCookie(event, sessionToken, session.expiresAt);
	// 	return new Response(null, {
	// 		status: 302,
	// 		headers: {
	// 			Location: '/'
	// 		}
	// 	});
	// }
	let userId: string;
	if (existingUser) {
		userId = existingUser.id;
	} else {
		userId = generateUserId();
		await db.insert(table.user).values({
			id: userId,
			// email: claims.email,
			username: githubUsername,
			// avatar: claims.picture,
			githubId: githubUserId
		});
	}

	// // TODO: Replace this with your own DB query.
	// const user = await createUser(githubUserId, githubUsername);

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, userId);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
