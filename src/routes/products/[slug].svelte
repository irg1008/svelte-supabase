<script context="module" lang="ts">
	import type { LoadInput } from "@sveltejs/kit";
	import type { Product } from "$lib/utils/apollo/schemas.types";

	//import api from "$lib/middlewares/api";

	const load = async ({ page }: LoadInput) => {
		const { slug } = page.params;

		//const { data, error } = await api.getProductsBySlug(slug);

		//if (error) {
		return { status: 404, error: "No such product with given slug" };
		//}

		//return { props: { product: data.products[0] } };
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
