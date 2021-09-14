import type { Writable } from "svelte/store";

interface CarouselContext {
	activeIndex: Writable<number>;
	goToPosition: (position: number) => void;
	swapItem: (target: HTMLElement) => void;
}

export type { CarouselContext };
