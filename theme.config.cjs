const {
	trueGray: darkTheme,
	trueGray: lightTheme,
	emerald: emeralTheme,
	amber: amberTheme,
	yellow: darkPrimary,
	green: lightPrimary,
	red: emeralPrimary,
	sky: amberPrimary,
} = require("tailwindcss/colors");

const themeConfig = {
	themes: [
		{
			name: "base",
			selectors: [":root", ".light"],
			theme: {
				backgroundColor: {
					primary: lightPrimary[700],
					secondary: lightPrimary[400],
					tertiary: lightPrimary[300],
				},
				textColor: {
					primary: lightPrimary[50],
					secondary: lightPrimary[700],
					tertiary: lightPrimary[900],
				},
				colors: {
					lighter: lightTheme[100],
					light: lightTheme[300],
					medium: lightTheme[400],
					dark: lightTheme[700],
					darker: lightTheme[900],
				},
				borderRadius: {
					custom: "9999px",
				},
				borderWidth: {
					button: "2px",
				},
				borderColor: {
					button: darkTheme[600],
				},
			},
		},
		{
			name: "dark",
			selectors: [".dark"],
			theme: {
				backgroundColor: {
					primary: darkPrimary[500],
					secondary: darkPrimary[800],
					tertiary: darkPrimary[300],
				},
				textColor: {
					primary: darkPrimary[50],
					secondary: darkPrimary[700],
					tertiary: darkPrimary[900],
				},
				colors: {
					lighter: darkTheme[900],
					light: darkTheme[700],
					medium: darkTheme[500],
					dark: darkTheme[300],
					darker: darkTheme[100],
				},
				borderRadius: {
					custom: "9999px",
				},
				borderWidth: {
					button: "2px",
				},
				borderColor: {
					button: darkTheme[400],
				},
			},
		},
		{
			name: "emerald",
			selectors: [".emerald"],
			theme: {
				backgroundColor: {
					primary: emeralPrimary[500],
					secondary: emeralPrimary[600],
					tertiary: emeralPrimary[700],
				},
				textColor: {
					primary: emeralPrimary[100],
					secondary: emeralPrimary[300],
					tertiary: emeralPrimary[50],
				},
				colors: {
					lighter: emeralTheme[100],
					light: emeralTheme[300],
					medium: emeralTheme[500],
					dark: emeralTheme[700],
					darker: emeralTheme[900],
				},
				borderRadius: {
					custom: "0.5rem",
				},
				borderWidth: {
					button: "2px",
				},
				borderColor: {
					button: emeralTheme[800],
				},
			},
		},
		{
			name: "amber",
			selectors: [".amber"],
			theme: {
				backgroundColor: {
					primary: amberPrimary[500],
					secondary: amberPrimary[600],
					tertiary: amberPrimary[700],
				},
				textColor: {
					primary: amberPrimary[100],
					secondary: amberPrimary[300],
					tertiary: amberPrimary[50],
				},
				colors: {
					lighter: amberTheme[100],
					light: amberTheme[300],
					medium: amberTheme[500],
					dark: amberTheme[700],
					darker: amberTheme[900],
				},
				borderRadius: {
					custom: "0.5rem",
				},
				borderWidth: {
					button: "2px",
				},
				borderColor: {
					button: amberTheme[800],
				},
			},
		},
	],
};

module.exports = themeConfig;
