import type { Metadata } from "next";
import StyledComponentsRegistry from "../lib/registry";
import ThemeWrapper from "../lib/ThemeWrapper";
import VerticalNavBar from "../components/VerticalNavBar";
import { ApolloProvider } from "@/lib/apolloProvider";
import ParentLayout from "@/components/ParentLayout";

export const metadata: Metadata = {
  title: "CloneX Explorer",
  description:
    "Interactive explorer for the CloneX NFT project, providing real-time insights and analytics through a subgraph API.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider>
          <StyledComponentsRegistry>
            <ThemeWrapper>
              <VerticalNavBar />
              <ParentLayout>{children}</ParentLayout>
            </ThemeWrapper>
          </StyledComponentsRegistry>
        </ApolloProvider>
      </body>
    </html>
  );
}
