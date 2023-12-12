"use client";
import React, { ReactNode, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const ParentLayoutContainer = styled.div`
  padding-left: 0px;
`;

const ParentLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const el = useRef(null);

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(el.current, {
        keyframes: [{ paddingLeft: 100, duration: 0.25, ease: "sine.out" }],
        ease: "expo.inOut",
      });
    }, el);
  }, []);

  return <ParentLayoutContainer ref={el}>{children}</ParentLayoutContainer>;
};

export default ParentLayout;
