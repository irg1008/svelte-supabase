<script>
	import { cart } from "$lib/stores/cart";

	// Total price.
	$: total = $cart.reduce(
		(sum, { product, quantity }) => sum + product.price * quantity,
		0,
	);
</script>

{#if $cart.length > 0}
	<table class="table-auto" cellpadding="10">
		<thead>
			<tr>
				<th>Img</th>
				<th>Name</th>
				<th>Quantity</th>
				<th>Price</th>
				<th>Total Price</th>
				<th>Add</th>
				<th>Delete</th>
			</tr>
		</thead>
		<tbody>
			{#each $cart as { product, quantity }}
				<tr>
					<td>
						<div class="image-holder">
							<img src={product.images[0].url} alt={product.name} />
						</div>
					</td>
					<td>{product.name}</td>
					<td>{quantity}</td>
					<td>{product.price}</td>
					<td>{quantity * product.price}</td>
					<td>
						<button on:click={() => cart.addProduct(product)}> + </button>
					</td>
					<td>
						<button on:click={() => cart.removeProduct(product.id)}> - </button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<br />
	<p>TOTAL: {total}</p>
	<br />
	<button on:click={cart.clearCart}>Clear cart</button>
{:else}
	Add products to cart to see them here
{/if}

<style lang="postcss">
	table {
		@apply text-center
			bg-light
			rounded-xl
			w-full;
	}

	.image-holder {
		@apply bg-white
			h-10
			w-10
			rounded-xl
			flex
			items-center
			justify-center
			overflow-hidden
			m-auto;
	}
</style>
