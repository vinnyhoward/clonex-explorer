"use client";
import React, { ReactNode, useRef } from "react";
import styled from "styled-components";
// import gsap from "gsap";

const ParentLayoutContainer = styled.div`
    padding: 0px 0px 0px 100px;

  @media (max-width: 700px) {
    padding: 0px 0px 0px 70px;
  }
`;

const ParentLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const el = useRef(null);

  // useLayoutEffect(() => {
  //   gsap.context(() => {
  //     gsap.to(el.current, {
  //       keyframes: [{ paddingLeft: 100, duration: 0.25, ease: "sine.out" }],
  //       ease: "expo.inOut",
  //     });
  //   }, el);
  // }, []);

  return <ParentLayoutContainer ref={el}>{children}</ParentLayoutContainer>;
};

export default ParentLayout;
