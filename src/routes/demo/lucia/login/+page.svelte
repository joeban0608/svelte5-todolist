<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1 class="p-4 text-4xl">Login/Register</h1>
<form method="post" action="?/login" use:enhance class="flex flex-col gap-4 p-4">
	<label>
		Username
		<input name="username" />
	</label>
	<label>
		Password
		<input type="password" name="password" />
	</label>
	<div class="flex gap-4">
		<button class="btn btn-outline">Login</button>
		<button class="btn btn-outline" formaction="?/register">Register</button>
	</div>
</form>
<p style="color: red">{form?.message ?? ''}</p>
