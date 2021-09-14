import { writable } from "svelte-local-storage-store";

const themes = ["light", "dark", "emerald", "amber"] as const;
type Theme = typeof themes[number];

// Default theme.
const defaultTheme: Theme = "light";

// Theme value.
const theme = writable<Theme>("theme", defaultTheme);

const setTheme = (): void => {
	// On theme change.
	theme.subscribe((value) => {
		const root = document.documentElement;

		// Remove all previous themes.
		themes.forEach((oldTheme) => {
			if (value !== oldTheme) root.classList.remove(oldTheme);
		});

		// Add new theme.
		root.classList.add(value);
	});
};

export { themes, theme, setTheme };
export type { Theme };
