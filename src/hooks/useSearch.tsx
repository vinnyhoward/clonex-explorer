"use client";
import React, { useState, createContext, useContext, ReactNode } from "react";

type SearchContextType = {
  searchInput: string;
  setSearchInput: (input: string) => void;
};

const defaultState = {
  searchInput: "",
  setSearchInput: () => {},
};

export const SearchContext = createContext<SearchContextType>(defaultState);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchInput, setSearchInput] = useState<string>("");

  const value = {
    searchInput,
    setSearchInput,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
