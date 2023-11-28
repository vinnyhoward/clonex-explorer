"use client";
import { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import gsap from "gsap";
import C from "../assets/images/c.png";
import L from "../assets/images/l.png";
import O from "../assets/images/o.png";
import N from "../assets/images/n.png";
import E from "../assets/images/e.png";
import X from "../assets/images/x.png";

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
    transform-origin: center;
    margin-top: 90px;
    font-weight: 700;
    width: 100%;
    text-transform: uppercase;
    font-size: 24px;
  }

  .clone-logo {
    filter: brightness(0) invert(1);
  }

  .clone-logo-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }

  .clone-logo-container > * {
    margin-right: 10px;
  }

  .letter-c,
  .letter-l,
  .letter-o,
  .letter-n,
  .letter-e,
  .letter-x {
    opacity: 0;
    transform: translateY(10px);
  }

  .letter-x {
    position: absolute;
    left: 420px;
    top: 0px;
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


      const duration = 1.5;
      gsap.to(".letter-c", {
        keyframes: [
          { y: 1, delay: 1, opacity: 1, ease: "sine.out", duration },
        ],
        ease: "expo.inOut",
      });
      gsap.to(".letter-l", {
        keyframes: [{ y: 1, delay: 1.4, opacity: 1, ease: "sine.out", duration }],
        ease: "expo.inOut",
      });
      gsap.to(".letter-o", {
        keyframes: [
          { y: 1, delay: 1.6, opacity: 1, ease: "sine.out", duration },
        ],
        ease: "expo.inOut",
      });
      gsap.to(".letter-n", {
        keyframes: [
          { y: 1, delay: 2., opacity: 1, ease: "sine.out", duration },
        ],
        ease: "expo.inOut",
      });
      gsap.to(".letter-e", {
        keyframes: [
          { y: 1, delay: 2.4, opacity: 1, ease: "sine.out", duration },
        ],
        ease: "expo.inOut",
      });
      gsap.to(".letter-x", {
        keyframes: [
          { y: 1, delay: 2.8, opacity: 1, ease: "sine.out", duration },
        ],
        ease: "expo.inOut",
      });
    }, el);
  }, []);

  return (
    <InfoBarContainer ref={el}>
      <div className="container">
        <div className="title">Explorer</div>
        <div className="clone-logo-container">
          <Image
            className="clone-logo letter-c"
            alt="C"
            src={C}
            width={75}
            height={75}
          />
          <Image
            className="clone-logo letter-l"
            alt="L"
            src={L}
            width={75}
            height={75}
          />
          <Image
            className="clone-logo letter-o"
            alt="O"
            src={O}
            width={75}
            height={75}
          />
          <Image
            className="clone-logo letter-n"
            alt="N"
            src={N}
            width={75}
            height={75}
          />
          <Image
            className="clone-logo letter-e"
            alt="E"
            src={E}
            width={70}
            height={70}
          />
          <Image
            className="clone-logo letter-x"
            alt="X"
            src={X}
            width={76}
            height={76}
          />
        </div>
      </div>
    </InfoBarContainer>
  );
};

export default VerticalInfoBar;
