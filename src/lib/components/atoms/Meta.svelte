<script lang="ts">
	export let title: string;
	export let description: string = undefined;
</script>

<svelte:head>
	<title>Anatomía Mediterránea - {title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>
