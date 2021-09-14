<script context="module" lang="ts">
	import type { LoadInput } from "@sveltejs/kit";
	import type { Product } from "$lib/db";
	import { api } from "$lib/db";

	const load = async ({ page }: LoadInput) => {
		const { slug } = page.params;

		const { data: products, error } = await api.getProducts(slug);

		if (error) {
			return { status: 500, error: "Some error ocurred" };
		}

		if (products.length === 0) {
			return { status: 404, error: "No such product with given slug" };
		}

		return { props: { product: products[0] } };
	};

	export { load };
</script>

<script lang="ts">
	export let product: Product;
</script>

<svelte:head>
	<title>{product.name} - {product.price}</title>
</svelte:head>

<pre>{JSON.stringify(product, null, 2)}</pre>
