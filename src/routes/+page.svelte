<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	let todos = $state([
		{ id: uuidv4(), text: 'finish Svelte tutorial' },
		{ id: uuidv4(), text: 'build an app' },
		{ id: uuidv4(), text: 'world domination' }
	]);

	let createTodoValue = $state('');

	function addTodo() {
		todos.push({
			id: uuidv4(),
			text: createTodoValue
		});
		createTodoValue = '';
	}

	function deleteTodo(id: string) {
		todos = todos.filter((todo) => todo.id !== id);
	}

	$inspect(() => {
		console.log('todos changed', todos);
	});
</script>

<h1 class="p-6 pb-0 text-center text-4xl tracking-widest">To do List</h1>
<main class="flex flex-col items-center justify-center p-6">
	<div class="flex w-full flex-col gap-4">
		<input class="w-full" bind:value={createTodoValue} />
		<button class="btn btn-outline w-1/4" onclick={addTodo}>Add</button>
	</div>
	<ul class="flex w-full flex-col">
		{#each todos as todo, i}
			{@const text = todo.text}
			{@const id = todo.id}
			<li class="my-4 flex w-full items-center justify-between border p-4">
				<input bind:value={todo.text} />
				<div class="flex gap-4">
					<button class="btn btn-outline">Update</button>
					<button
						class="btn btn-error"
						onclick={() => {
							deleteTodo(id);
						}}>Delete</button
					>
				</div>
			</li>
		{/each}
	</ul>
</main>
