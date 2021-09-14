<script lang="ts">
	import type { Product } from "$lib/utils/apollo/schemas.types";
	import { cart } from "$lib/stores/cart";
	import { goto } from "$app/navigation";

	export let product: Product;
	const { images, name, price, available, slug } = product;

	const addProductToCart = () => cart.addProduct(product);
	const navigateToProduct = () => goto(`/products/${slug}`);
</script>

<div class="card">
	<div class="image-holder">
		<img src={images[0].url} alt={name} />
	</div>
	<h1>{name}</h1>
	<h2 class="price">${price}</h2>
	<div class="button-holder">
		<button on:click={addProductToCart} disabled={!available}>
			{available ? "Add to cart" : "Not available"}
		</button>
		<button on:click={navigateToProduct}>Details</button>
	</div>
</div>

<style lang="postcss">
	.card {
		@apply flex
			flex-col
			items-center
			justify-end
			gap-3
			p-3
			w-56
			bg-light
			transform
			rounded-xl;
	}

	.price {
		@apply text-2xl;
	}

	.button-holder {
		@apply flex
			flex-row
			gap-2;
	}

	.image-holder {
		@apply bg-white
			h-36
			w-full
			rounded-xl
			flex
			items-center
			justify-center
			overflow-hidden;
	}
</style>
