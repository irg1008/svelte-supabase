<script lang="ts">
	import { api } from "$lib/db";
	import ProductCard from "$lib/components/atoms/ProductCard.svelte";
</script>

{#await api.getProducts()}
	<p>Waiting to fetch</p>
{:then { data, error }}
	{#if data}
		<div class="products">
			{#each data as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<p>Error</p>
		{error.message}
	{/if}
{/await}

<style lang="postcss">
	.products {
		@apply flex
			flex-wrap
			justify-center
			gap-4;
	}
</style>
