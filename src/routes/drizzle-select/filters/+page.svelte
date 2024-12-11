<script lang="ts">
	import { firstWordUpperCaseAndJoinSpace } from '$lib/func/handleString';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const exampleName = 'basic-select';
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">{firstWordUpperCaseAndJoinSpace(exampleName)}</h1>
	<a href="https://orm.drizzle.team/docs/select#{exampleName}" class=" link-primary">詳見官網</a>
	<h3 class="text-2xl">Value is equal to number :</h3>
	<div class="mockup-code">
		<pre><code
				>{`
	// src/routes/drizzle-select/${exampleName}/+page.server.ts
	const todosEq = await db.select().from(todo).where(eq(todo.id, 3));

  --------------------------------------------------

	// server response data: { todos: Todo[] }
${JSON.stringify(data.todosEq ? data.todosEq : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Value is Not equal to number :</h3>
	<div class="mockup-code" style="max-height: 400px; overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-select/${exampleName}/+page.server.ts
	const todosNe = await db.select().from(todo).where(ne(todo.id, 3));

  --------------------------------------------------

	// server response data: { todos: Todo[] }
${JSON.stringify(data.todosNe ? data.todosNe : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Value is greater than number :</h3>
	<div class="mockup-code" style="max-height: 400px; overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-select/${exampleName}/+page.server.ts
	const todosGt = await db.select().from(todo).where(gt(todo.id, 3));

  --------------------------------------------------

	// server response data: { todos: Todo[] }
${JSON.stringify(data.todosGt ? data.todosGt : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Value is greater than number or equal to number :</h3>
	<div class="mockup-code" style="max-height: 400px; overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-select/${exampleName}/+page.server.ts
	const todosGte = await db.select().from(todo).where(gte(todo.id, 3));

  --------------------------------------------------

	// server response data: { todos: Todo[] }
${JSON.stringify(data.todosGte ? data.todosGte : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Value is less than number :</h3>
	<div class="mockup-code" style="max-height: 400px; overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-select/${exampleName}/+page.server.ts
	const todosLt = await db.select().from(todo).where(lt(todo.id, 3));

  --------------------------------------------------

	// server response data: { todos: Todo[] }
${JSON.stringify(data.todosLt ? data.todosLt : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Value is less than or equal to number :</h3>
	<div class="mockup-code" style="max-height: 400px; overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-select/${exampleName}/+page.server.ts
	const todosLte = await db.select().from(todo).where(lt(todo.id, 3));

  --------------------------------------------------

	// server response data: { todos: Todo[] }
${JSON.stringify(data.todosLte ? data.todosLte : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Value exists :</h3>
	<div class="mockup-code" style="max-height: 400px; overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-select/${exampleName}/+page.server.ts
	const query = db.select().from(user);
	const todoExistsInUser = await db.select().from(todo).where(exists(query));

  --------------------------------------------------

	// server response data: { todos: Todo[] }
${JSON.stringify(data.todoExistsInUser ? data.todoExistsInUser : data.error, null, 4)}
`}</code
			></pre>
	</div>
	<br />
	<br />
	<h3 class="text-2xl">Value not exists :</h3>
	<div class="mockup-code" style="max-height: 400px; overflow:scroll">
		<pre><code
				>{`
	// src/routes/drizzle-select/${exampleName}/+page.server.ts
	const query = db.select().from(user);
	const todoNoExistsInUser = await db.select().from(todo).where(notExists(query));

  --------------------------------------------------

	// server response data: { todos: Todo[] }
${JSON.stringify(data.todoNoExistsInUser ? data.todoNoExistsInUser : data.error, null, 4)}
`}</code
			></pre>
	</div>
</div>
