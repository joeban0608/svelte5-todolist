<script lang="ts">
	import { firstWordUpperCaseAndJoinSpace } from '$lib/func/handleString';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const exampleName = 'select-filters';
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">{firstWordUpperCaseAndJoinSpace(exampleName)}</h1>
	<a href="https://orm.drizzle.team/docs/rqb#{exampleName}" class=" link-primary">詳見官網</a>
	<h3 class="text-2xl">Filter user with todo :</h3>
	<div class="mockup-code" style="max-height: calc(100dvh / 2); overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-query/${exampleName}/+page.server.ts

	const userFilter = await globalDb.query.user.findMany({
		where: (user, { eq }) => eq(user.id, userId)
	});

  --------------------------------------------------

	// server response data: { users: UserWithTodo[] }
${JSON.stringify(data.filterUserWithTodo ? data.filterUserWithTodo : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Filter user todo id greater than 3 :</h3>
	<div class="mockup-code" style="max-height: calc(100dvh / 2); overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-query/${exampleName}/+page.server.ts

	const result = await globalDb.query.user.findMany({
		columns: {
			passwordHash:false,
		},
		with: {
			todo: true
		}
	});

  --------------------------------------------------

	// server response data: { users: UserWithTodo[] }
${JSON.stringify(data.filterUserTodoGte3 ? data.filterUserTodoGte3 : data.error, null, 4)}
`}</code
			></pre>
	</div>
</div>
