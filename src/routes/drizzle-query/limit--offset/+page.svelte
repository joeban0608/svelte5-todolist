<script lang="ts">
	import { firstWordUpperCaseAndJoinSpace } from '$lib/func/handleString';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const exampleName = 'limit--offset';
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">{firstWordUpperCaseAndJoinSpace(exampleName)}</h1>
	<a href="https://orm.drizzle.team/docs/rqb#{exampleName}" class=" link-primary">詳見官網</a>
	<h3 class="text-2xl">Limit 5 todo with username :</h3>
	<div class="mockup-code" style="max-height: calc(100dvh / 2); overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-query/${exampleName}/+page.server.ts

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

  --------------------------------------------------

	// server response data: { todo: TodoWithUser[] }
${JSON.stringify(data.limit5WithUserName ? data.limit5WithUserName : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Offset 2, Limit 5 todo with username :</h3>
	<div class="mockup-code" style="max-height: calc(100dvh / 2); overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-query/${exampleName}/+page.server.ts

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

  --------------------------------------------------

	// server response data: { todo: TodoWithUser[] }
${JSON.stringify(data.limit3Offset5WithUserName ? data.limit3Offset5WithUserName : data.error, null, 4)}
`}</code
			></pre>
	</div>
</div>
