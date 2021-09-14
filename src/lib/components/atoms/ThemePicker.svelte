<script lang="ts">
	import { theme, themes } from "$lib/stores/theme";
</script>

<div class="container">
	<label for="theme-select">
		<h2>Choose the theme:</h2>
	</label>
	<select id="theme-select" class="select" bind:value={$theme}>
		{#each themes as iTheme}
			<option value={iTheme}>
				{iTheme}
			</option>
		{/each}
	</select>
</div>

<style lang="postcss">
	.container {
		@apply flex
			items-center
			gap-2
			w-auto
			pl-3
			p-1
			rounded-custom
			bg-lighter
			text-dark;
	}

	.select {
		@apply bg-dark
			text-lighter
			rounded-custom;
	}
</style>
