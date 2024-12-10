<script lang="ts">
	import { firstWordUpperCaseAndJoinSpace } from '$lib/func/handleString';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const exampleName = 'find-first';
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">{firstWordUpperCaseAndJoinSpace(exampleName)}</h1>
	<a href="https://orm.drizzle.team/docs/rqb#{exampleName}" class=" link-primary">詳見官網</a>
	<div class="mockup-code">
		<pre><code
				>{`
	// src/routes/drizzle-query/${exampleName}/+page.svelte
	const result = await globalDb.query.user.findFirst()

  --------------------------------------------------

	// server response data: { user: UserWithTodo }
${JSON.stringify(data.user ? data.user : data.error, null, 4)}
`}</code
			></pre>
	</div>
</div>
