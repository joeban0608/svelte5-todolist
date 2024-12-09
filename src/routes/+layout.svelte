<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-dvh w-dvw p-12">
	{@render children()}
</div>
