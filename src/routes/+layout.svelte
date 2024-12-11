<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { firstWordUpperCaseAndJoinSpace } from '$lib/func/handleString';
	import { page } from '$app/stores';
	let pageRoute = $state('');
	page.subscribe((value) => {
		// console.log(value);
		pageRoute = value.route.id ?? '';
	});
	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	const drizzleQueryLinks = [
		'/drizzle-query/find-first',
		'/drizzle-query/find-many',
		'/drizzle-query/include-relations',
		'/drizzle-query/partial-fields-select',
		'/drizzle-query/nested-partial-fields-select',
		'/drizzle-query/select-filters',
		'/drizzle-query/limit--offset',
		'/drizzle-query/order-by',
		'/drizzle-query/include-custom-fields',
		'/drizzle-query/prepared-statements'
	];
	const drizzleSelectLinks = ['/drizzle-select/basic-select'];

	const hidden = $derived(pageRoute === '/demo/lucia/login');
</script>

{#snippet drizzleQueryLinkSnippet(links: string[])}
	{#each links as link}
		<li>
			<a href={link}>{firstWordUpperCaseAndJoinSpace(link)}</a>
		</li>
	{/each}
{/snippet}
{#snippet drizzleSelectLinkSnippet(links: string[])}
	{#each links as link}
		<li>
			<a href={link}>{firstWordUpperCaseAndJoinSpace(link)}</a>
		</li>
	{/each}
{/snippet}
<div class="h-dvh w-dvw">
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
				<ul
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
				>
					<li><a href="/">Todo list</a></li>
					<li>
						<summary class="hover:cursor-default hover:bg-inherit">Drizzle Query</summary>
						<ul class="p-2">
							{@render drizzleQueryLinkSnippet(drizzleQueryLinks)}
						</ul>
					</li>
					<li>
						<summary class="hover:cursor-default hover:bg-inherit">Drizzle Select</summary>
						<ul class="p-2">
							{@render drizzleQueryLinkSnippet(drizzleSelectLinks)}
						</ul>
					</li>
				</ul>
			</div>
			<span class="ml-4 text-xl">{data?.user?.username}</span>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal z-10 px-1">
				<li><a href="/">Todo list</a></li>
				<li>
					<details>
						<summary>Drizzle Query</summary>
						<ul class="p-2">
							{@render drizzleQueryLinkSnippet(drizzleQueryLinks)}
						</ul>
					</details>
				</li>
				<li>
					<details>
						<summary>Drizzle Select</summary>
						<ul class="p-2">
							{@render drizzleSelectLinkSnippet(drizzleSelectLinks)}
						</ul>
					</details>
				</li>
			</ul>
		</div>
		<div class="navbar-end {hidden ? 'hidden' : ''}">
			<form method="post" action="?/logout">
				<button class="link-warning">Sign out</button>
			</form>
		</div>
	</nav>
	{@render children()}
</div>
