<script context="module" lang="ts">
	import type { LoadInput } from "@sveltejs/kit";
	//import api from "$lib/middlewares/api";

	const load = async (_: LoadInput) => {
		//const { data, error } = await api.getProducts();

		//if (error) {
		return { status: 404, error: "No such product" };
		//}

		//return { props: { products: data.products } };
	};

	export { load };
</script>

<script lang="ts">
	import ProductCard from "$lib/components/atoms/ProductCard.svelte";
	import type { Product } from "$lib/utils/apollo/schemas.types";

	export let products: Product[];
</script>

<div class="products">
	{#each products as product (product.id)}
		<ProductCard {product} />
	{/each}
</div>

<style lang="postcss">
	.products {
		@apply flex
			flex-wrap
			justify-center
			gap-4;
	}
</style>
