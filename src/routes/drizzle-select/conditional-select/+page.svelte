<script lang="ts">
	import { firstWordUpperCaseAndJoinSpace } from '$lib/func/handleString';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const exampleName = 'conditional-select';
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">{firstWordUpperCaseAndJoinSpace(exampleName)}</h1>
	<a href="https://orm.drizzle.team/docs/select#{exampleName}" class=" link-primary">詳見官網</a>
	<div class="mockup-code">
		<pre><code
				>{`
	// src/routes/drizzle-select/\${exampleName}/+page.server.ts
	async function selectUsers({
		withName = true,
		withId = true
	}: {
		withName?: boolean;
		withId?: boolean;
	} = {}) {
		return db
			.select({
				...(withName ? { name: user.username } : {}),
				...(withId ? { id: user.id } : {})
			})
			.from(user);
	}
	const result = await selectUsers({ withId: false });
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
