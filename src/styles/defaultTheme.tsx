import { Outfit, Roboto_Flex } from 'next/font/google';

const robotoFlex = Roboto_Flex({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})


const outfit = Outfit({
  weight: ['700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const defaultTheme = {
  name: "default",
  borderRadius: "4px",
  colors: {
    darkerBlue: "#1C1D24",
    darkBlue: "#272A32",
    blue: "#393A4E",
    darkGrey: "#1E1F27",
    lightGrey: "#dddddd",
    red: "#F40105",
    white: "#FFFFFF",

  },
  gradient: {
    darkBlueGradient: `linear-gradient(135deg, #2F3039, #393A4E)`,
  },
  fontFamily: {
    robotoFlex: robotoFlex.style.fontFamily,
    outfit: outfit.style.fontFamily,
  }
};