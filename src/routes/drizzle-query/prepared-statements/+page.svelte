<script lang="ts">
	import { firstWordUpperCaseAndJoinSpace } from '$lib/func/handleString';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const exampleName = 'order-by';
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">{firstWordUpperCaseAndJoinSpace(exampleName)}</h1>
	<a href="https://orm.drizzle.team/docs/rqb#{exampleName}" class=" link-primary">詳見官網</a>
	<div class="mockup-code">
		<pre><code
				>{`
	// src/routes/drizzle-query/${exampleName}/+page.server.ts

	const p1 = await globalDb.query.user
		.findMany({
			where: (user, { eq }) => eq(user.username, sql.placeholder('username')),
			with: {
				todo: true
			}
		})
		.prepare('p1');
	const usersWithTodos = await p1.execute({ username: 'rexrex' });
	return {
		users: usersWithTodos
	};

  --------------------------------------------------

	// server response data: { users: UserWithTodo[] }
${JSON.stringify(data.users ? data.users : data.error, null, 4)}
`}</code
			></pre>
	</div>
</div>
