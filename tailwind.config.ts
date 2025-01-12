import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "custom-green-primary": "#3A4D39",
                "custom-green-dark": "#2C3C2C",
                "custom-green-light": "#4F6F52",
                "custom-yellow-primary": "#ECE3CE",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [
        require("daisyui"),
        require("@tailwindcss/typography"),
        function (api: PluginAPI) {
            const { addUtilities } = api;
            addUtilities({
                '.required::after': {
                    content: "'*'",
                    color: '#ef4444', // Tailwind's red-500
                    marginLeft: '0.25rem', // Tailwind's ml-1
                },
            });
        },
    ],
    daisyui: {
        darkTheme: "light",
    },
};

export default config;
