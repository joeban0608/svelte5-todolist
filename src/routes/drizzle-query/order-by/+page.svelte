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

	const result = await globalDb.query.todo.findMany({
		orderBy: (todo, { asc, desc }) => [asc(todo.text)]
	});
	return {
		todos: result
	};

  --------------------------------------------------

	// server response data: { todos: Todo[] }
${JSON.stringify(data.todos ? data.todos : data.error, null, 4)}
`}</code
			></pre>
	</div>
</div>
