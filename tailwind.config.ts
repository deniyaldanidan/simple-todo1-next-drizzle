import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "page-margin-x": "var(--page-margin-x)",
      },
      colors: {
        foreground: "var(--foreground)",
        secForeground: "var(--sec-foreground)",
        background: "var(--background)",
        secBackground: "var(--sec-background)",
        secHighBackground: "var(--sec-high-background)",
        terBackground: "var(--ter-background)",
        dimBackground: "var(--dim-background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        danger: "#ef4444",
      },
      fontSize: {
        "logo-font": "var(--logo-font)",
        "menu-font": "var(--menu-font)",
        "btn-font": "var(--btn-font)",
        "section-title-font": "var(--section-title-font)",
        "section-subtitle-font": "var(--section-subtitle-font)",
        "input-font": "var(--input-font)",
      },
    },
  },
  plugins: [],
};
export default config;
