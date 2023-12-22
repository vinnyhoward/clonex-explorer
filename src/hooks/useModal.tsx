"use client";
import React, { useState, createContext, useContext, ReactNode } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

const defaultState = {
  isModalOpen: false,
  setIsModalOpen: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultState);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const setIsModalOpen = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  const value = {
    isModalOpen,
    setIsModalOpen,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
