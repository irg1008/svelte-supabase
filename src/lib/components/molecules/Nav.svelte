<script lang="ts">
	import Logo from "$lib/components/atoms/Logo.svelte";
	import ThemePicker from "$lib/components/atoms/ThemePicker.svelte";
	import { cart } from "$lib/stores/cart";
	import Icon, { ShoppingCart } from "svelte-hero-icons";

	// Cart Length.
	$: cartLength = $cart.reduce((sum, { quantity }) => sum + quantity, 0);
</script>

<div class="navbar">
	<a href="/" class="logo">
		<Logo />
	</a>
	<ol class="links">
		<li>
			<a href="/products">products</a>
		</li>
		<li>
			<a href="/add-products">Add products</a>
		</li>
		<li>
			<a href="/cart" class="cart">
				<div class="cart-icon">
					<Icon src={ShoppingCart} />
				</div>
				<div class="cart-length">
					{cartLength}
				</div>
			</a>
		</li>
	</ol>
	<ThemePicker />
</div>

<style lang="postcss">
	.navbar {
		@apply flex
      justify-between
      items-center
      bg-light
      p-3
      w-full
      top-0
      left-0;
	}

	.logo {
		@apply h-8;
	}

	.links {
		@apply flex
      items-center
      gap-4
      justify-center;
	}

	.cart {
		@apply flex
      items-center
      justify-center
      gap-1
      relative;
	}

	.cart-icon {
		@apply h-8;
	}

	.cart-length {
		@apply bg-primary
      text-gray-50
      rounded-full
      px-1
			border-2
			border-light
      absolute
      -top-4
      -right-3;
	}

	a {
		@apply hover:underline
      uppercase;
	}
</style>
