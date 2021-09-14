import { onMount } from "svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

interface IntervalProps {
	cb: () => void;
	ms: number;
}

interface IntervalReturnValue {
	resetInterval: () => void;
	value: Writable<number>;
}

const useInterval = ({ cb, ms }: IntervalProps): IntervalReturnValue => {
	let interval: NodeJS.Timer;

	const initialValue = ms / 1000;
	const value = writable(initialValue);
	let valueInterval: NodeJS.Timer;

	const cleanValueInterval = () => {
		value.set(initialValue);
		clearInterval(valueInterval);
	};

	const decrementValue = () => {
		value.update((old) => {
			old--;

			if (old === 1) {
				cleanValueInterval();
			}

			return old;
		});
	};

	const createValueInterval = () => {
		valueInterval = setInterval(() => {
			decrementValue();
		}, 1000);
	};

	const initInterval = () => {
		createValueInterval();
		interval = setInterval(cb, ms);
	};

	const removeInterval = () => {
		cleanValueInterval();
		clearInterval(interval);
	};

	const resetInterval = () => {
		removeInterval();
		initInterval();
	};

	onMount(() => {
		initInterval();
		return () => removeInterval();
	});

	return { resetInterval, value };
};

export { useInterval };
