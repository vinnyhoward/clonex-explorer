"use client";
import React, { useState, createContext, useContext } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_TOKENS_QUERY } from "@/graphql/tokenQueries";
import { Token } from "@/types";
import { fetchBase64ForToken } from "@/utils/fetchBase64ForToken";

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

  const loadMoreTokens = async () => {
    if (loading || !data?.tokens) return;
    setLoading(true);
    const nextScrollPosition =
      typeof window !== "undefined" ? window.scrollY : 0;

    try {
      const currentSkipAmount = skipAmount;
      const response = await fetchMore({
        variables: {
          first: QUERY_SIZE,
          skip: currentSkipAmount,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;

          const updatedTokens = fetchMoreResult.tokens.map(async (token) => {
            const base64Image = await fetchBase64ForToken(token.id);
            return { ...token, metadata: { ...token.metadata, base64Image } };
          });

          Promise.all(updatedTokens).then((tokensWithBase64) => {
            setCloneData((prevTokens) => {
              if (!prevTokens) return tokensWithBase64;
              return [...prevTokens, ...tokensWithBase64];
            });
          });

          const newSkipAmount = currentSkipAmount + QUERY_SIZE;
          setSkipAmount(newSkipAmount);
        },
      });

      if (response.networkStatus === 7 && typeof window !== "undefined") {
        window.scrollTo(0, nextScrollPosition - 100);
      }
    } catch (error) {
      console.error("Error fetching more tokens:", error);
    } finally {
      setLoading(false);
    }
  };

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
