"use client";
import React, { useState, createContext, useContext, useCallback } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_TOKENS_QUERY } from "@/graphql/tokenQueries";
import { Token } from "@/types";

const QUERY_SIZE = 50;

type UseCloneDataContextType = {
  cloneData: Token[];
  setCloneData: (data: Token[]) => void;
  loadMoreTokens: () => Promise<void>;
  loading: boolean;
};

const defaultState = {
  cloneData: [],
  setCloneData: () => {},
  loadMoreTokens: async () => {},
  loading: false,
};

export const CloneDataContext =
  createContext<UseCloneDataContextType>(defaultState);

export const CloneProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cloneData, setCloneData] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [skipAmount, setSkipAmount] = useState<number>(0);
  const { data, fetchMore } = useSuspenseQuery(GET_TOKENS_QUERY, {
    variables: { first: QUERY_SIZE, skip: skipAmount },
  });

  const loadMoreTokens = useCallback(async () => {
    // @ts-ignore
    if (loading || !data?.tokens) return;
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
  }, []);

  const value = {
    cloneData,
    setCloneData,
    loadMoreTokens,
    loading,
  };

  return (
    <CloneDataContext.Provider value={value}>
      {children}
    </CloneDataContext.Provider>
  );
};

export const useCloneData = () => useContext(CloneDataContext);
