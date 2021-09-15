<script lang="ts">
	import { api } from "$lib/db";
	import type { CustomError } from "$lib/db";
	import type { PartialProduct } from "$lib/db";

	const initialProduct: PartialProduct = {
		name: "",
		description: "",
		price: 10,
		available: true,
		images: [],
	};

	let newProduct = initialProduct;
	let files: FileList;
	let errorMsg: string;

	const addNewProduct = async () => {
		const { error } = await api.addProduct(newProduct, files);
		errorMsg = error.message;
	};
</script>

<form on:submit|preventDefault={addNewProduct}>
	<label>
		<p>Name</p>
		<input type="text" bind:value={newProduct.name} />
	</label>
	<label>
		<p>Description</p>
		<textarea bind:value={newProduct.description} />
	</label>
	<label>
		<p>Price</p>
		<input type="number" bind:value={newProduct.price} step="any" />
	</label>
	<label>
		<p>Images</p>
		<input type="file" bind:files accept="image/*" multiple />
	</label>
	<label>
		<p>Available</p>
		<input
			type="checkbox"
			checked={newProduct.available}
			on:click={() => {
				newProduct.available = !newProduct.available;
			}}
		/>
	</label>
	<br />
	<button type="submit">Add new product</button>
	{#if errorMsg}
		{errorMsg}
	{/if}
</form>
