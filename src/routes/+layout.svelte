<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-dvh w-dvw">
	{@render children()}
</div>
