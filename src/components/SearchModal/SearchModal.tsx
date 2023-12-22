"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearch } from "@/hooks/useSearch";
import { useModal } from "@/hooks/useModal";
import { Loader } from "../Loader/Loader";
import { ThinSearchIcon } from "../Icons";

type SearchModalProps = {};
interface SearchModalContainerProps {
  $isModalOpen: boolean;
}
const SearchModalContainer = styled.div<SearchModalContainerProps>`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.$isModalOpen ? "flex" : "none")};
  z-index: 1;

  .outer-modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(10px);
    background-color: rgba(34, 35, 44, 0.9);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
    width: 500px;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
  }

  .search-bar {
    background: none;
    border: none;
    outline: none;
    height: 100%;
    width: 100%;
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSize.xxl};
    line-height: 40px;
    margin-left: 10px;
    z-index: 1;
  }

  .search-bar::placeholder {
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSize.xxl};
    line-height: 40px;
    z-index: 1;
  }
`;

export const SearchModal: React.FC<SearchModalProps> = () => {
  const { searchInput, setSearchInput } = useSearch();
  const { isModalOpen, setIsModalOpen } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "");

    setSearchInput(inputValue);
    setIsTyping(true);
  };

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  useEffect(() => {
    const keyDownHandler = (
      event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <SearchModalContainer $isModalOpen={isModalOpen}>
      <div className="outer-modal-container">
        <div className="thin-search-icon">
          {loading ? <Loader /> : <ThinSearchIcon />}
        </div>
        <input
          onChange={onInputChange}
          className="search-bar"
          type="text"
          placeholder="Search by token id..."
          value={searchInput}
        />
      </div>
    </SearchModalContainer>
  );
};
