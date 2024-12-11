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
			// .selectDistinct({ text: todo.text, userId: todo.userId })
			.selectDistinctOn([todo.text])
			.from(todo)
			.where(eq(todo.userId, event.locals.user.id))
			.orderBy(desc(todo.text));
		return {
			todos: result
		};
	} catch (error) {
		console.error('error', error);
		return { error: 'query globalDb db was wrong.' };
	}
	--------------------------------------------------

	// server response data: { todo: Todo[] }
${JSON.stringify(data.todos ? data.todos : data.error, null, 4)}
		`}
		</code></pre>
	</div>
</div>
