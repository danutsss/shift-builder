tailwind.config = {
	theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			fontSize: {
				xxs: "0.65rem",
			},
			colors: {
				clifford: "#da373d",
				"red-vivid": {
					50: "#ffe3e3",
					100: "#ffbdbd",
					200: "#ff9b9b",
					300: "#f86a6a",
					400: "#ef4e4e",
					500: "#e12d39",
					600: "#cf1124",
					700: "#ab091e",
					800: "#8a041a",
					900: "#610316",
				},
				white: "#ffffff",
				black: "#212529",
			},
		},
	},
};
