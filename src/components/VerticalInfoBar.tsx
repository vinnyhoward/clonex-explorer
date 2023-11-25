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

  .navbar-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: auto 0;
    overflow-x: hidden;
  }

  .title {
    transform: rotate(-90deg);
    transform-origin: "center";
    width: 100%;
  }
`;

const VerticalInfoBar = () => {
  const el = useRef(null);

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(".container", {
        keyframes: [{ x: 280, duration: 0.45, ease: "sine.out" }],
        ease: "expo.inOut",
      });
    }, el);
  }, []);

  return (
    <InfoBarContainer ref={el}>
      <div className="container">
        <div className="title">CloneX Explorer</div>
      </div>
    </InfoBarContainer>
  );
};

export default VerticalInfoBar;
