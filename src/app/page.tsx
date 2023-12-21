"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CloneDataList, Token } from "@/types";
import { GET_TOKENS_QUERY } from "@/graphql/tokenQueries";
import { CloneXLogo } from "@/components/CloneXLogo";
import { useCloneData } from "@/hooks/useCloneData";

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

const QUERY_SIZE = 50;
export default function Page() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [skipAmount, setSkipAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { cloneData, setCloneData } = useCloneData();
  const { data, fetchMore } = useSuspenseQuery(GET_TOKENS_QUERY, {
    variables: { first: QUERY_SIZE, skip: skipAmount },
  });
  const queryData = data as CloneDataList;

  const loadMoreTokens = useCallback(async () => {
    if (loading || !queryData.tokens) return;
    setLoading(true);
    const nextScrollPosition = window.scrollY;

    try {
      const currentSkipAmount = skipAmount;
      const response = await fetchMore({
        variables: {
          first: QUERY_SIZE,
          skip: currentSkipAmount,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;

          setCloneData((prevTokens) => {
            if (!prevTokens) return fetchMoreResult.tokens;
            return [...prevTokens, ...fetchMoreResult.tokens];
          });

          const newSkipAmount = currentSkipAmount + QUERY_SIZE;
          setSkipAmount(newSkipAmount);
        },
      });

      if (response.networkStatus === 7) {
        window.scrollTo(0, nextScrollPosition - 100);
      }
    } catch (error) {
      console.error("Error fetching more tokens:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, queryData.tokens, fetchMore, skipAmount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreTokens();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading, loadMoreTokens]);

  const renderGridItem = () => {
    if (!queryData.tokens) return Array.from({ length: 100 }).map(() => null);

    return cloneData.map((token: Token) => (
      <GridItem key={uuidv4()}>
        <Link href={`/clone/${token.id}`}>
          <div className="content">
            <Image
              src={token.metadata.image}
              alt={`CloneX#${token.id}`}
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
      <div className="logo-wrapper">
        <CloneXLogo />
      </div>
      <Grid>
        {renderGridItem()}
        <SentinelDiv ref={sentinelRef} />
      </Grid>
    </main>
  );
}
