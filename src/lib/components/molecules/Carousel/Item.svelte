<script lang="ts">
	import { getContext, onMount } from "svelte";
	import type { CarouselContext } from "./Carousel.types";

	const { activeIndex, goToPosition } =
		getContext<CarouselContext>("CarouselContext");

	let item: HTMLElement;
	let i: number;

	onMount(() => {
		i = Array.from(item.parentElement.children).indexOf(item);
	});
</script>

<section
	class="item"
	bind:this={item}
	class:active-section={$activeIndex === i}
	on:click={() => $activeIndex !== i && goToPosition(i)}
>
	<slot />
</section>

<style lang="postcss">
	.item {
		@apply snap-start
      relative
			transition-opacity
			duration-300
			delay-100
			min-h-screen
      w-full
			flex;
	}

	.item:not(.active-section) {
		@apply opacity-20
			cursor-pointer;
	}
</style>
