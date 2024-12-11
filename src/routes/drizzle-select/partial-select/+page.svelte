<script lang="ts">
	import { firstWordUpperCaseAndJoinSpace } from '$lib/func/handleString';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const exampleName = 'partial-select';
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">{firstWordUpperCaseAndJoinSpace(exampleName)}</h1>
	<a href="https://orm.drizzle.team/docs/select#{exampleName}" class=" link-primary">詳見官網</a>
	<div class="mockup-code">
		<pre><code
				>{`
	// src/routes/drizzle-select/\${exampleName}/+page.server.ts
	const result = await db
		.select({
			id: user.id,
			user_name: user.username,
			sql_upper_name: sql\`UPPER(\${user.username})\`
		})
		.from(user);

	return {
		users: result
	};
	--------------------------------------------------

	// server response data: { users: User[] }
${JSON.stringify(data.users ? data.users : data.error, null, 4)}
		`}
		</code></pre>
	</div>
</div>
