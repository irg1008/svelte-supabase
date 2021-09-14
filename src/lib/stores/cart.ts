import { writable } from "svelte-local-storage-store";

import type { Product } from "$lib/db";

interface Item {
	product: Product;
	quantity: number;
}

type Cart = Item[];

const createCart = () => {
	const { subscribe, update, set } = writable<Cart>("cart", []);

	const getProductFromCart = (productId: string, cart: Cart) =>
		cart.find((item) => item.product.id === productId);

	const addProduct = (product: Product): void => {
		update((cart) => {
			const productInCart = getProductFromCart(product.id, cart);

			if (productInCart) productInCart.quantity++;
			else cart.push({ product, quantity: 1 });

			return cart;
		});
	};

	const removeProduct = (productId: string): void => {
		update((cart) => {
			const productInCart = getProductFromCart(productId, cart);

			if (productInCart) {
				if (productInCart.quantity > 1) productInCart.quantity--;
				else cart = cart.filter((item) => item !== productInCart);
			}

			return cart;
		});
	};

	const clearCart = () => set([]);

	return {
		subscribe,
		addProduct,
		removeProduct,
		clearCart,
	};
};

const cart = createCart();
export { cart };
export type { Product };
