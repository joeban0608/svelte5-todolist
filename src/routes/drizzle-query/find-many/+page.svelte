<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log('data', data.users);
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">Find many</h1>
	<a href="https://orm.drizzle.team/docs/rqb#querying" class=" link-primary">詳見官網</a>
	<div class="mockup-code">
		<pre><code
				>{`
	// src/routes/drizzle-query/find-many/+page.svelte
	const result = await globalDb.query.user.findMany()

  --------------------------------------------------

	// server response data: { users: UserWithTodo[] }
${JSON.stringify(data.users ? data.users : data.error, null, 4)}
`}</code
			></pre>
	</div>
</div>
