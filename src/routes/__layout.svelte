<script lang="ts">
	import "../app.postcss"; // Global styles.
	import Header from "$lib/components/organisms/Header.svelte";
	import { setTheme } from "$lib/stores/theme";
	import { onMount } from "svelte";

	onMount(() => {
		setTheme();
	});

	let headerHeight: number = 0;
</script>

<Header bind:headerHeight />

<main style="--header-height: {headerHeight}px">
	<slot />
</main>

<footer />

<style lang="postcss">
	main {
		margin-top: var(--header-height);
	}
</style>
