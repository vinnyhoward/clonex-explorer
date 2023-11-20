"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/GlobalStyles";
import { defaultTheme } from "../styles/defaultTheme";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
