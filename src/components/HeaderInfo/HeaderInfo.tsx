import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HeaderInfoContainer = styled.div`
  padding: 30px;

  h2 {
    font-size: 6rem;
    font-weight: 900;
    text-align: center;
  }

  .owner-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-top: 1px solid ${(props) => props.theme.colors.darkBlue};
    border-bottom: 1px solid ${(props) => props.theme.colors.darkBlue};
    text-transform: uppercase;
  }

  p {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    margin: 0 20px;
  }

  .owner-address {
    cursor: pointer;
  }
`;

interface HeaderInfoProps {
  tokenId: string;
  ownerAddress: string;
}

enum GlitchMode {
  Forwards = "forwards",
  Backwards = "backwards",
  Both = "both",
}

const truncateWalletAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  tokenId,
  ownerAddress,
}) => {
  const [glitchTokenId, setGlitchTokenId] = useState(tokenId);
  const [glitchOwner, setGlitchOwner] = useState(
    truncateWalletAddress(ownerAddress)
  );
  const [subheadingText, setSubheadingText] = useState("Asset Owner");
  // Text below is for glitch reference. Will delete later.
  // ABCDFGHXYZa@#གྷ靔𒉁䰚쵲曝줡齃퀰𐅙뒸룎ƒŒ™šůžΑΒΓΔΕΖΗΘЯЖЭЮЯაბგდეΩ℧∂∆∏∑−∕∙√日月火水木金土花鳥風月星空雲雨中国字文学漢語
  // 日本語韓國語अआइईउऊऋऌऍऎएकखगघङचछजझञटഅആഇഈഉഊഋഌഎഏタチツテトナニヌネノハヒフヘホバビブベボパピプペポマミムメモ
  const glitchText = (
    originalText: string,
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    fillMode: GlitchMode
  ) => {
    const len = originalText.length;
    const randomArr = Array.from({ length: len }, (_, i) =>
      originalText[i] === " "
        ? "_"
        : ["タ", "Δ", "マ", "ツ", "뒸", "ホ", "0", "1", "ベ", "Ζ", "モ", "フ"][
            Math.floor(Math.random() * 12)
          ]
    );

    const getSpeed = () => parseInt("7") * 10 + 20;

    const fillText = (i: number, forward = true) => {
      if (forward || fillMode === "forwards") {
        randomArr.splice(i, 1, originalText[i]);
      } else {
        const index = fillMode === "both" ? len - i - 1 : i;
        randomArr.splice(index, 1, originalText[index]);
      }
      setFunction(randomArr.join(""));
    };

    for (let i = 0; i < len; i++) {
      setTimeout(() => {
        fillText(i, i % 2 === 0);
      }, (i + 1) * getSpeed());
    }
  };

  useEffect(() => {
    glitchText(tokenId, setGlitchTokenId, GlitchMode.Both);
    glitchText(
      truncateWalletAddress(ownerAddress),
      setGlitchOwner,
      GlitchMode.Both
    );
    glitchText("Asset Owner", setSubheadingText, GlitchMode.Both);
  }, [tokenId, ownerAddress]);

  const etherscanUrl = `https://etherscan.io/address/${ownerAddress}`;
  return (
    <HeaderInfoContainer>
      <h2>{glitchTokenId}</h2>
      <div className="owner-container">
        <p>{subheadingText}</p>
        <a href={etherscanUrl} target="_blank" rel="noopener noreferrer">
          <p className="owner-address">{glitchOwner}</p>
        </a>
      </div>
    </HeaderInfoContainer>
  );
};
