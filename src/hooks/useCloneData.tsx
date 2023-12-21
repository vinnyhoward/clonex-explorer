"use client";
import React, { useState, createContext, useContext, ReactNode } from "react";
import { Token, CloneDetails } from "@/types";

type UseCloneDataContextType = {
  cloneData: Token[];
  setCloneData: (data: Token[]) => void;
  cloneDetails: CloneDetails;
  setCloneDetails: (data: CloneDetails) => void;
};

const defaultState = {
  cloneData: [],
  setCloneData: () => {},
  cloneDetails: {} as CloneDetails,
  setCloneDetails: () => {},
};

export const CloneDataContext =
  createContext<UseCloneDataContextType>(defaultState);

export const CloneProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cloneData, setCloneData] = useState<Token[]>([]);
  const [cloneDetails, setCloneDetails] = useState<CloneDetails>(
    {} as CloneDetails
  );

  const value = {
    cloneData,
    setCloneData,
    cloneDetails,
    setCloneDetails,
  };

  return (
    <CloneDataContext.Provider value={value}>
      {children}
    </CloneDataContext.Provider>
  );
};

export const useCloneData = () => useContext(CloneDataContext);
