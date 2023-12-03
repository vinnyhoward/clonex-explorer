"use client";

import { useEffect, useState, Suspense, useRef, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import { gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
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

export const SentinelDiv = styled.div`
  width: 100%;
  height: 1px;
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

const QUERY_SIZE = 100;
const GET_TOKENS_QUERY = gql`
  query GetTokens($first: Int!, $after: ID) {
    tokens(first: $first, after: $after) {
      id
      tokenId
      metadata {
        image
      }
    }
  }
`;
export default function Page() {
  const sentinelRef = useRef(null);
  const [afterCursor, setAfterCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data, fetchMore } = useSuspenseQuery(GET_TOKENS_QUERY, {
    variables: { first: QUERY_SIZE, after: afterCursor },
  });
  const queryData = data as QueryData;

  const loadMoreTokens = useCallback(async () => {
    console.log("Loading more tokens - Current cursor:", afterCursor);
    if (loading || !queryData.tokens) {
      console.log("Loading halted - Loading state or no tokens");
      return;
    }
    setLoading(true);

    const lastToken = queryData.tokens[queryData.tokens.length - 1];
    const lastTokenId = lastToken ? lastToken.id : null;
    try {
      await fetchMore({
        variables: {
          first: QUERY_SIZE,
          after: lastTokenId,
        },
        updateQuery: (
          prev: any,
          { fetchMoreResult }: { fetchMoreResult?: any }
        ) => {
          const prevQueryData = prev as QueryData;
          const fetchMoreQueryData = fetchMoreResult as QueryData;

          if (!fetchMoreQueryData) return prevQueryData;
          return {
            tokens: [...prevQueryData.tokens, ...fetchMoreQueryData.tokens],
          };
        },
      });
      setAfterCursor(lastTokenId);
    } catch (error) {
      console.error("Error fetching more tokens:", error);
    } finally {
      setLoading(false);
    }
    console.log("Fetched more tokens - New cursor:", lastTokenId);
  }, [loading, queryData.tokens]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreTokens();
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading, loadMoreTokens]);

  const renderGridItem = () => {
    if (!queryData.tokens) return Array.from({ length: 100 }).map(() => null);

    return queryData.tokens.map((token) => (
      <GridItem key={uuidv4()}>
        <div className="content">
          <Image
            src={token.metadata.image}
            alt={`CloneX#${token.tokenId}`}
            width={500}
            height={500}
          />
        </div>
      </GridItem>
    ));
  };

  console.log("data:", data);
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Grid>
          {renderGridItem()}
          <SentinelDiv ref={sentinelRef} />
        </Grid>
      </Suspense>
    </main>
  );
}
