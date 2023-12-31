import React from "react";
import styled from "styled-components";
import Image from "next/image";
import CloneX from "../assets/images/clone-x-logo.png";
import { defaultTheme } from "@/styles/defaultTheme";

const CloneXLogoContainer = styled.div`
  position: relative;

  .parent-wrapper {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 40px;
    z-index: 2;

    @media (max-width: 600px) {
      margin: 0;
      transform: translate(-30%, -10%);
      margin: 20px;
    }
  }

  .clone-logo-wrapper {
    position: fixed;
    margin-top: 17px;
    margin-left: 21px;
    z-index: 2;
  }

  .sentinel-shadow {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 150px;
    height: 70px;
    z-index: 1;
    background-color: transparent;
    margin: 50px;

    @media (max-width: 600px) {
      display: none;
    }
  }

  .background-wrapper {
    z-index: 1;
  }
`;

interface CloneXLogoProps {}

export const CloneXLogo: React.FC<CloneXLogoProps> = () => {
  return (
    <CloneXLogoContainer>
      <div className="parent-wrapper">
        <div className="clone-logo-wrapper">
          <Image src={CloneX} alt="CloneX Logo" width={160} height={160} />
        </div>
        <Background />
      </div>
      <div className="sentinel-shadow" />
    </CloneXLogoContainer>
  );
};

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
  strokeColor?: string;
}

export const Background: React.FC<LogoProps> = ({
  width = 272,
  height = 115,
  scale = 0.75,
  color = defaultTheme.colors.darkBlue,
  strokeColor = defaultTheme.colors.blue,
}) => {
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  return (
    <svg
      width={scaledWidth}
      height={scaledHeight}
      viewBox={`0 0 275 115`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        stroke={strokeColor}
        strokeWidth="5"
        d="M2 113V12.299L9.05263 2H270V91.2577L255.111 113H2Z"
      />
    </svg>
  );
};
