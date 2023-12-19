import React, { useState, createContext, useContext, ReactNode } from "react";

type SearchContextType = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  searchInput: string;
  setSearchInput: (input: string) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
};

const defaultState = {
  isModalOpen: false,
  setIsModalOpen: () => {},
  searchInput: "",
  setSearchInput: () => {},
  searchResults: [],
  setSearchResults: () => {},
};

export const SearchContext = createContext<SearchContextType>(defaultState);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const value = {
    isModalOpen,
    setIsModalOpen,
    searchInput,
    setSearchInput,
    searchResults,
    setSearchResults,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
