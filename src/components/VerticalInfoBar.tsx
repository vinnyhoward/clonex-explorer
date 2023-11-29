"use client";
import { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const InfoBarContainer = styled.div`
  .container {
    position: fixed;
    left: -180px;
    top: 0;
    height: 100vh;
    width: 80px;
    background-color: ${(props) => props.theme.colors.blue};
    z-index: 0;
    padding: 50px 0;
  }

  .title {
    transform: rotate(-90deg);
    transform-origin: center;
    margin-top: 180px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 24px;
    white-space: nowrap;
  }
`;

const VerticalInfoBar = () => {
  const el = useRef(null);

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(".container", {
        keyframes: [{ x: 280, duration: 0.35, ease: "sine.out" }],
        ease: "expo.inOut",
      });
    }, el);
  }, []);

  return (
    <InfoBarContainer ref={el}>
      <div className="container">
        <div className="title">Asset Explorer</div>
      </div>
    </InfoBarContainer>
  );
};

export default VerticalInfoBar;
