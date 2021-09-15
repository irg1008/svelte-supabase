<script lang="ts">
	import { onMount, setContext } from "svelte";
	import { writable } from "svelte/store";
	import Icon, { ArrowUp, ArrowDown } from "svelte-hero-icons";
	import { useInterval } from "$lib/hooks";
	import type { CarouselContext } from "./Carousel.types";

	export let useCarouselInterval = false;
	export let intervalTime = 10; // Seconds.

	let activeIndex = writable(0);

	let carousel: HTMLElement;
	let carouselChildren: Element[] = [];
	$: carouselLength = carouselChildren.length;

	onMount(() => {
		carouselChildren = Array.from(carousel.children);
	});

	const getCorrentIndex = (position: number) =>
		position < 0 ? carouselLength - 1 : position % carouselLength;

	const onScroll = () => {
		const activeChild = carouselChildren.find((child) => {
			const half = child.clientHeight / 2;
			const bottom = child.getBoundingClientRect().bottom;
			const show = bottom - half >= 0;
			return show;
		});

		const activeChildIndex = carouselChildren.indexOf(activeChild);
		const correctIndex = getCorrentIndex(activeChildIndex);

		activeIndex.set(correctIndex);

		resetInterval();
	};

	const swapItem = (target: Element) => target.scrollIntoView();

	const goToPosition = (position: number) => {
		const correctIndex = getCorrentIndex(position);
		const target = carousel.children.item(correctIndex);
		swapItem(target);
		resetInterval();
	};

	const goUp = () => goToPosition($activeIndex - 1);
	const goDown = () => goToPosition($activeIndex + 1);

	const { resetInterval, value } = useInterval({
		cb: useCarouselInterval && goDown,
		ms: intervalTime * 1000,
	});

	setContext<CarouselContext>("CarouselContext", {
		activeIndex,
		goToPosition,
		swapItem,
	});
</script>

<div class="carousel-container">
	<div class="carousel" bind:this={carousel} on:scroll={onScroll}>
		<slot />
	</div>
	<div class="controls">
		<div
			class="arrow up"
			on:click={goUp}
			title="Go to page {getCorrentIndex($activeIndex - 1) + 1}"
		>
			<Icon src={ArrowUp} />
		</div>
		{#each Array(carouselLength) as _, i}
			<div
				title={$activeIndex !== i
					? `Go to page ${i + 1}`
					: `Already in page ${i + 1}`}
				on:click={() => $activeIndex !== i && goToPosition(i)}
				class:active={$activeIndex === i}
				class="control-item"
			/>
		{/each}
		<div
			class="arrow down"
			on:click={goDown}
			title="Go to page {getCorrentIndex($activeIndex + 1) + 1}"
		>
			<Icon src={ArrowDown} />
		</div>
		{#if useCarouselInterval}
			<div class="remaining-time">
				{$value}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.carousel-container {
		@apply w-full
			relative;
		height: calc(100vh - var(--header-height, 0));
	}

	.carousel {
		@apply snap
			snap-y
			flex
			flex-col
			gap-8
			overflow-y-scroll
			relative
      h-full
      w-full;
		scroll-behavior: smooth;
	}

	.carousel::-webkit-scrollbar {
		display: none !important;
	}

	.remaining-time {
		@apply bg-primary
			text-lighter
			rounded-custom
			text-center
			p-2;
	}

	.arrow {
		@apply w-8
      h-8
      my-4
			cursor-pointer
			bg-lighter
			rounded-custom
			p-2
      ease-in-out
			transition-transform
      duration-200;
	}

	.up {
		@apply top-0
    hover:-translate-y-1;
	}

	.down {
		@apply bottom-0
      hover:translate-y-1;
	}

	.controls {
		@apply flex
			flex-col
			justify-center
			items-center
			mr-10
			absolute
			right-0
			bottom-1/2
			transition-opacity
			duration-300
			ease-in-out
			transform
			translate-y-1/2
			gap-2
			md:opacity-0;
	}

	.carousel-container:hover > .controls {
		@apply opacity-100;
	}

	.control-item {
		@apply rounded-full
			bg-dark
			transition-all
			border-light
			border-2
			w-3
			h-3;
	}

	.control-item:not(.active) {
		@apply opacity-80
			cursor-pointer
			hover:bg-medium
			hover:scale-125;
	}

	.active {
		@apply bg-primary
			duration-200;
	}
</style>
