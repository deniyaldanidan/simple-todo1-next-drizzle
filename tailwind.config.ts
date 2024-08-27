import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        laptop: { max: "1281px" },
        "laptop-md": { max: "1125px" },
        "laptop-sm": { max: "1024px" },
        "tablet-xl": { max: "900px" },
        "tablet-lg": { max: "800px" },
        tablet: { max: "768px" },
        "tablet-sm": { max: "640px" },
        mobile: { max: "510px" },
        "mobile-lg": { max: "425px" },
        "mobile-md": { max: "375px" },
        "mobile-sm": { max: "325px" },
        "mobile-xs": { max: "299px" },
      },
      spacing: {
        "page-margin-x": "var(--page-margin-x)",
      },
      colors: {
        foreground: "var(--foreground)",
        secForeground: "var(--sec-foreground)",
        dimForeground: "var(--dim-foreground)",
        background: "var(--background)",
        secBackground: "var(--sec-background)",
        secHighBackground: "var(--sec-high-background)",
        terBackground: "var(--ter-background)",
        dimBackground: "var(--dim-background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        danger: "#ef4444",
        warn: "#fdba74",
        success: "#86efac",
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
