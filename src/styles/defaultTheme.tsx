import { Outfit, Roboto_Flex } from "next/font/google";

const robotoFlex = Roboto_Flex({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  weight: ["700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const defaultTheme = {
  name: "default",
  borderRadius: "4px",
  colors: {
    // old colors
    darkerBlue: "#1C1D24",
    darkBlue: "#272A32",
    blue: "#393A4E",
    darkGrey: "#1E1F27",
    lightGrey: "#dddddd",
    red: "#F40105",
    white: "#FFFFFF",
    // new colors
    turquoise: "#00F0B5",
    hotPink: "#F61067",
    yellow: "#FFD166",
    slateGrey: "#404451",
    charcoal: "#22232C",
    periwinkle: "#6A7086",
    blueCharcoal: "#191920",
  },
  gradient: {
    darkBlueGradient: `linear-gradient(135deg, #2F3039, #393A4E)`,
  },
  fontFamily: {
    robotoFlex: robotoFlex.style.fontFamily,
    outfit: outfit.style.fontFamily,
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    xxl: "1.5rem", // 24px
    xxxl: "2rem", // 32px
    jumboXl: "8rem", // 128px
  },
};
