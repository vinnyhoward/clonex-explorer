"use client";
import React, { ReactNode, useRef } from "react";
import styled from "styled-components";
import { useModal } from "@/hooks/useModal";
import "react-loading-skeleton/dist/skeleton.css";

const ParentLayoutContainer = styled.div`
  padding: 0px 0px 0px 100px;

  @media (max-width: 700px) {
    padding: 0px 0px 0px 70px;
  }
`;

const ParentLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const el = useRef(null);
  const { setIsModalOpen } = useModal();

  return (
    <ParentLayoutContainer onClick={() => setIsModalOpen(false)} ref={el}>
      {children}
    </ParentLayoutContainer>
  );
};

export default ParentLayout;
