"use client";

import styled from "styled-components";
import Image from "next/image";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const GridItem = styled.div`
  background-color: #f0f0f0;
  position: relative;
  width: 100%;

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

type TokenMetadata = {
  image: string;
};

type Token = {
  id: string;
  tokenId: string;
  metadata: TokenMetadata;
};

type QueryData = {
  tokens: Token[];
};

const query = gql`
  {
    tokens(first: 42) {
      id
      tokenId
      metadata {
        image
      }
    }
  }
`;

export default function Page() {
  const { data } = useSuspenseQuery(query);
  const typedData = data as QueryData;
  console.log(typedData);

  const renderGridItem = () => {
    return typedData.tokens.map((token) => {
      return (
        <GridItem key={token.id}>
          <div className="content">
            <Image
              src={token.metadata.image}
              alt={`CloneX#${token.tokenId}`}
              width={500}
              height={500}
            />
          </div>
        </GridItem>
      );
    });
  };

  return (
    <main>
      <Grid>{renderGridItem()}</Grid>
    </main>
  );
}
