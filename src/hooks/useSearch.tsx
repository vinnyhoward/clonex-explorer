"use client";
import React, { useState, createContext, useContext, ReactNode } from "react";

type SearchContextType = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  searchInput: string;
  setSearchInput: (input: string) => void;
};

const defaultState = {
  isModalOpen: false,
  setIsModalOpen: () => {},
  searchInput: "",
  setSearchInput: () => {},
};

export const SearchContext = createContext<SearchContextType>(defaultState);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const setIsModalOpen = (isOpen: boolean) => {
    setSearchInput("");
    setModalOpen(isOpen);
  }

  const value = {
    isModalOpen,
    setIsModalOpen,
    searchInput,
    setSearchInput,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
