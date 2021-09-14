<script context="module" lang="ts">
	import type { LoadOutput } from "@sveltejs/kit";
	import Meta from "$lib/components/atoms/Meta.svelte";

	const load = ({
		status = 500,
		error = "",
	}: LoadOutput): { props: { status: number; message: string } } => {
		const message = typeof error === "string" ? error : error.message;

		return {
			props: {
				status,
				message,
			},
		};
	};

	export { load };
</script>

<script lang="ts">
	export let status: number;
	export let message: string;
</script>

<Meta title={`${status}: ${message}`} />

<div class="text-center">
	<h1>{status}</h1>
	<h2>{message}</h2>
</div>
