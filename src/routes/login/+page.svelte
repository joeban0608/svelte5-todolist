<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">Sign in</h1>
	<ul>
		<li class="btn"><a href="/login/github">Sign in with GitHub</a></li>
	</ul>
</div>
