import type { Metadata } from "next";
import { ThemeProvider } from "styled-components";
import StyledComponentsRegistry from "./registry";

export const metadata: Metadata = {
  title: "CloneX Explorer",
  description:
    "Interactive explorer for the CloneX NFT project, providing real-time insights and analytics through a subgraph API.",
};

const theme = {
  main: "mediumseagreen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
