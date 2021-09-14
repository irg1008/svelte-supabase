<script lang="ts">
	import { api } from "$lib/db";
	import ProductCard from "$lib/components/atoms/ProductCard.svelte";
</script>

{#await api.getProducts()}
	<p>Waiting to fetch</p>
{:then res}
	{#if res.data}
		<div class="products">
			{#each res.data as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<p>Error</p>
		{res.error.message}
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
