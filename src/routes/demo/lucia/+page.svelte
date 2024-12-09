<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<nav class="navbar bg-base-100 shadow">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</div>
			<ul class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
				<li><a href="/">Todo list</a></li>
				<li>
					<a href="/drizzle-relation">Drizzle Relation Example</a>
					<ul class="p-2">
						<li><a href="/drizzle-relation/one-to-one">One to one</a></li>
						<!-- <li><a>Submenu 2</a></li> -->
					</ul>
				</li>
			</ul>
		</div>
		<span class="ml-4 text-xl">{data.user.username}</span>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/">Todo list</a></li>
			<li>
				<details>
					<summary>Drizzle Relation</summary>
					<ul class="p-2">
						<li><a href="/drizzle-relation">Drizzle Relation Example</a></li>
						<li><a href="/drizzle-relation/one-to-one">One to one</a></li>
					</ul>
				</details>
			</li>
		</ul>
	</div>
	<div class="navbar-end">
		<form method="post" action="?/logout">
			<button class="link-warning">Sign out</button>
		</form>
	</div>
</nav>
<h1>Hi, {data.user.username}!</h1>
<p>Your user ID is {data.user.id}.</p>
