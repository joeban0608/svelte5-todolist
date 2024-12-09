<script lang="ts">
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();

	// let todos = $state([
	// 	{ id: uuidv4(), text: 'finish Svelte tutorial' },
	// 	{ id: uuidv4(), text: 'build an app' },
	// 	{ id: uuidv4(), text: 'world domination' }
	// ]);

	// let createTodoValue = $state('');

	function addTodo() {
		// todos.push({
		// 	id: uuidv4(),
		// 	text: createTodoValue
		// });
		// createTodoValue = '';
	}

	function deleteTodo(id: string) {
		// todos = todos.filter((todo) => todo.id !== id);
	}

	$effect(() => {
		console.log('todos changed', data.todos);
	});
</script>

<h1 class="p-6 pb-0 text-center text-4xl tracking-widest">To do List</h1>
<main class="flex flex-col items-center justify-center p-6">
	<form method="post" action="?/create" class="flex w-full flex-col gap-4">
		<input class="w-full" name="text" />
		<button class="btn btn-outline w-1/4" onsubmit={addTodo}>Add</button>
	</form>
	<ul class="flex w-full flex-col">
		{#each data.todos as todo, i}
			{@const text = todo.text}
			{@const id = todo.id}
			<li class="my-4 flex w-full items-center justify-between border p-4 gap-4">
				<form method="post" action="?/updated" class="flex w-full justify-between">
					<input type="hidden" name="id" value={todo.id} />
					<input name="text" bind:value={todo.text} />
					<button class="btn btn-outline">Update</button>
				</form>
				<div class="flex gap-4">
					<form method="post" action="?/delete">
						<input type="hidden" name="id" value={todo.id} />
						<button class="btn btn-error">Delete</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
</main>
