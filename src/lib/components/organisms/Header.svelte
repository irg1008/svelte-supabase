<script lang="ts">
	import Nav from "$lib/components/molecules/Nav.svelte";
	export let headerHeight: number = undefined;
</script>

<header bind:clientHeight={headerHeight}>
	<Nav />
</header>

<style lang="postcss">
	header {
		@apply z-10
			w-full
			fixed
			shadow-lg
			top-0
			left-0;
	}
</style>
