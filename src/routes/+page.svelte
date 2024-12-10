<script lang="ts">
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
</script>

<h1 class="p-6 pb-0 text-center text-4xl tracking-widest">To do List</h1>
<main class="flex flex-col items-center justify-center p-6">
	<form method="post" action="?/create" class="flex w-full flex-col gap-4">
		<input type="hidden" name="userId" value={data.user?.id} />
		<input class="w-full" name="text" />
		<button class="btn btn-outline w-1/4">Add</button>
	</form>
	<ul class="flex w-full flex-col">
		{#each data.todos as todo}
			<li class="my-4 flex w-full items-center justify-between gap-4 border p-4">
				<form method="post" action="?/updated" class="flex w-full justify-between">
					<input type="hidden" name="id" value={todo.id} />
					<input type="hidden" name="userId" value={data.user?.id} />
					<input name="text" bind:value={todo.text} />
					<button class="btn btn-outline">Update</button>
				</form>
				<div class="flex gap-4">
					<form method="post" action="?/delete">
						<input type="hidden" name="userId" value={data.user?.id} />
						<input type="hidden" name="id" value={todo.id} />
						<button class="btn btn-error">Delete</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
</main>
