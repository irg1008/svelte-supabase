const colors = require("tailwindcss/colors");
const themes = require("./theme.config.cjs");
const themeSwapper = require("tailwindcss-theme-swapper");
const tailwindForms = require("@tailwindcss/forms");
const scrollSnap = require("tailwindcss-scroll-snap");

const safelist = ["scale-100", "scale-120"];

const config = {
	mode: "jit",
	purge: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				gray: colors.trueGray,
			},
		},
	},
	safelist,
	variants: {},
	plugins: [themeSwapper(themes), tailwindForms(), scrollSnap],
};

module.exports = config;
