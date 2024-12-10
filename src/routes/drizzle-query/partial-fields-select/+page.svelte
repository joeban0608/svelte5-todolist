<script lang="ts">
	import { firstWordUpperCaseAndJoinSpace } from '$lib/func/handleString';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const exampleName = 'partial-fields-select';
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">{firstWordUpperCaseAndJoinSpace(exampleName)}</h1>
	<a href="https://orm.drizzle.team/docs/rqb#{exampleName}" class=" link-primary">詳見官網</a>
	<h3 class="text-2xl">Column 內有 key 且 key 的 value 為 true :</h3>
	<div class="mockup-code" style="max-height: calc(100dvh / 2); overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-query/${exampleName}/+page.server.ts

	const result = await globalDb.query.user.findMany({
		columns: {
			id: true,
			username: true
		},
		with: {
			todo: true
		}
	});

  --------------------------------------------------

	// server response data: { users: UserWithTodo[] }
${JSON.stringify(data.users ? data.users : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Column 內有 key, key 的 value 為 false</h3>
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
${JSON.stringify(data.users2 ? data.users2 : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Column 沒內有 key</h3>
	<div class="mockup-code" style="max-height: calc(100dvh / 2); overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-query/${exampleName}/+page.server.ts

	const result = await globalDb.query.user.findMany({
		columns: {},
		with: {
			todo: true
		}
	});

  --------------------------------------------------

	// server response data: { users: UserWithTodo[] }
${JSON.stringify(data.users3 ? data.users3 : data.error, null, 4)}
`}</code
			></pre>
	</div>
</div>
