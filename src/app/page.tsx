"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CloneDataList, Token } from "../types";

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

const SentinelDiv = styled.div`
  width: 100%;
  height: 1px;
`;

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
  const queryData = data as CloneDataList;

  const loadMoreTokens = useCallback(async () => {
    if (loading || !queryData.tokens) return;
    setLoading(true);

    try {
      const currentLastTokenId = afterCursor;
      await fetchMore({
        variables: {
          first: QUERY_SIZE,
          after: currentLastTokenId,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          const updatedData = {
            tokens: [...prev.tokens, ...fetchMoreResult.tokens],
          };
          const newLastToken =
            updatedData.tokens[updatedData.tokens.length - 1];
          setAfterCursor(newLastToken ? newLastToken.id : null);
          return updatedData;
        },
      });
    } catch (error) {
      console.error("Error fetching more tokens:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, queryData.tokens, afterCursor, fetchMore]);

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

    return queryData.tokens.map((token: Token) => (
      <GridItem key={uuidv4()}>
        <Link href={`/clone/${token.tokenId}`}>
          <div className="content">
            <Image
              src={token.metadata.image}
              alt={`CloneX#${token.tokenId}`}
              width={500}
              height={500}
            />
          </div>
        </Link>
      </GridItem>
    ));
  };

  return (
    <main>
      <Grid>
        {renderGridItem()}
        <SentinelDiv ref={sentinelRef} />
      </Grid>
    </main>
  );
}
