<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
