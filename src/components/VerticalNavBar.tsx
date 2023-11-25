"use client";
import { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import Logo from "./Logo";
import { OpenSeaIcon, DiscordIcon, TwitterIcon } from "./icons";
import { defaultTheme } from "../styles/defaultTheme";

const NavBarContainer = styled.div`
  .container {
    position: fixed;
    left: -100px;
    top: 0;
    height: 100vh;
    width: 100px;
    background-color: ${(props) => props.theme.colors.darkBlue};
    z-index: 1;
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

  .logo-wrapper {
    display: flex;
    align-items: center;
    height: 200px;
  }

  .social-container {
  }

  .icon-wrapper {
    margin: 20px 0;
  }
`;

const VerticalNavBar = () => {
  const el = useRef(null);

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(".container", {
        keyframes: [
          { x: 100, duration: 0.25, ease: "sine.out" }, // finetune with individual eases
        ],
        ease: "expo.inOut", // ease the entire keyframe bloc
      });
    }, el);
  }, []);

  const iconSize = 25;
  return (
    <NavBarContainer className="container" ref={el}>
      <div className="container">
        <div className="navbar-content">
          <div className="social-container">
            <div className="icon-wrapper">
              <OpenSeaIcon
                color={defaultTheme.colors.white}
                width={iconSize}
                height={iconSize}
              />
            </div>
            <div className="icon-wrapper">
              <DiscordIcon
                color={defaultTheme.colors.white}
                width={iconSize}
                height={iconSize}
              />
            </div>
            <div className="icon-wrapper">
              <TwitterIcon
                color={defaultTheme.colors.white}
                width={iconSize}
                height={iconSize}
              />
            </div>
          </div>
          <div className="logo-wrapper">
            <Logo rotate />
          </div>
        </div>
      </div>
    </NavBarContainer>
  );
};

export default VerticalNavBar;
