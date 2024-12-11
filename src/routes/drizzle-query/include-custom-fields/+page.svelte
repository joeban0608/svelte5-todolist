<script lang="ts">
	import { firstWordUpperCaseAndJoinSpace } from '$lib/func/handleString';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const exampleName = 'include-custom-fields';
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">{firstWordUpperCaseAndJoinSpace(exampleName)}</h1>
	<a href="https://orm.drizzle.team/docs/rqb#{exampleName}" class=" link-primary">詳見官網</a>
	<h3 class="text-2xl">Column 內有 key 且 key 的 value 為 true :</h3>
	<div class="mockup-code">
		<pre><code
				>{`
	// src/routes/drizzle-query/${exampleName}/+page.server.ts

	const result = await globalDb.query.todo.findMany({
			orderBy: (todo, { asc, desc }) => [desc(todo.id)],
			extras: {
					extra_lower_text: sql\`lower(\${todo.text})\`.as('extra_lower_text'),
					extra_concat_id_and_text: sql\`concat(\${todo.id}, '_', \${todo.text})\`.as(
							'extra_concat_id_and_text'
					),
					extra_text_length: sql\`length(\${todo.text})\`.as('extra_text_length')
			}
	});

	--------------------------------------------------

	// server response data: { todos: Todo[] }
${JSON.stringify(data.todos ? data.todos : data.error, null, 4)}
		`}</code
			></pre>
	</div>
</div>
