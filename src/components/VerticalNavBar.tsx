"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import gsap from "gsap";
import { RTFKTLogo } from "@/components/RTFKTLogo";
import { useModal } from "@/hooks/useModal";
import { defaultTheme } from "@/styles/defaultTheme";
import {
  OpenSeaIcon,
  DiscordIcon,
  TwitterIcon,
  TransactionIcon,
  HomeIcon,
  SearchIcon,
} from "./Icons";

const NavBarContainer = styled.div`
  .container {
    position: fixed;
    top: 0;
    left: -100px;
    height: 100vh;
    width: 100px;
    background-color: ${(props) => props.theme.colors.darkerBlue};
    z-index: 1;
    padding: 50px 12px;

    @media (max-width: 1000px) {
      width: 70px;
      padding: 50px 0px;
    }

    @media (max-width: 600px) {
      width: 50px;
    }
  }

  .navbar-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: auto 0;
    overflow-x: hidden;
    padding-bottom: 50px;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    transform: rotate(-90deg);
    margin-bottom: 26px;

    @media (max-width: 600px) {
      margin-left: 15px;
    }
  }

  .social-container {
    margin-bottom: 30px;
  }

  .icon-wrapper {
    margin: 20px 0;
    cursor: pointer;
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.colors.slateGrey};
    margin-bottom: 120px;
  }

  .bottom-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const VerticalNavBar = () => {
  const el = useRef(null);
  const { setIsModalOpen, isModalOpen } = useModal();

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(".container", {
        keyframes: [{ x: 100, duration: 0.25, ease: "sine.out" }],
        ease: "expo.inOut",
      });
    }, el);
  }, []);

  const iconSize = 25;
  return (
    <NavBarContainer ref={el}>
      <div className="container">
        <div className="navbar-content">
          <div className="top-section">
            <div className="nav-container">
              <div
                className="icon-wrapper"
                onClick={() => setIsModalOpen(false)}
              >
                <Link href="/">
                  <HomeIcon
                    color={defaultTheme.colors.white}
                    width={iconSize}
                    height={iconSize}
                  />
                </Link>
              </div>
              <div
                className="icon-wrapper"
                onClick={() => setIsModalOpen(false)}
              >
                <Link href="/activity">
                  <TransactionIcon
                    color={defaultTheme.colors.white}
                    width={iconSize}
                    height={iconSize}
                  />
                </Link>
              </div>
              <div
                className="icon-wrapper"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <SearchIcon
                  color={defaultTheme.colors.white}
                  width={iconSize}
                  height={iconSize}
                />
              </div>
            </div>
          </div>

          <div className="bottom-section">
            <div className="social-container">
              <div className="icon-wrapper">
                <a
                  href="https://opensea.io/collection/clonex"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <OpenSeaIcon
                    color={defaultTheme.colors.white}
                    width={iconSize}
                    height={iconSize}
                  />
                </a>
              </div>
              <div className="icon-wrapper">
                <a
                  href="https://discord.gg/rtfkt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DiscordIcon
                    color={defaultTheme.colors.white}
                    width={iconSize}
                    height={iconSize}
                  />
                </a>
              </div>
              <div className="icon-wrapper">
                <a
                  href="https://twitter.com/rtfktstudios"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon
                    color={defaultTheme.colors.white}
                    width={iconSize}
                    height={iconSize}
                  />
                </a>
              </div>
            </div>
            <div className="divider" />
            <div className="logo-wrapper">
              <RTFKTLogo />
            </div>
          </div>
        </div>
      </div>
    </NavBarContainer>
  );
};

export default VerticalNavBar;
