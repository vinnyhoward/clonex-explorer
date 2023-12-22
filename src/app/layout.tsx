import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import ThemeWrapper from "@/lib/ThemeWrapper";
import VerticalNavBar from "@/components/VerticalNavBar";
import { ApolloProvider } from "@/lib/apolloProvider";
import ParentLayout from "@/components/ParentLayout";
import { SearchModal } from "@/components/SearchModal/SearchModal";
import { SearchProvider } from "@/hooks/useSearch";
import { ModalProvider } from "@/hooks/useModal";
import { CloneProvider } from "@/hooks/useCloneData";

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
              <ModalProvider>
                <SearchProvider>
                  <CloneProvider>
                    <SearchModal />
                    <VerticalNavBar />
                    <ParentLayout>{children}</ParentLayout>
                  </CloneProvider>
                </SearchProvider>
              </ModalProvider>
            </ThemeWrapper>
          </StyledComponentsRegistry>
        </ApolloProvider>
      </body>
    </html>
  );
}
