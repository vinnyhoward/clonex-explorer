import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { glitchText, GlitchMode } from "../../utils/glitchText";
import { truncateWalletAddress } from "../../utils/truncateWalletAddress";

const HeaderInfoContainer = styled.div`
  padding: 30px;

  h2 {
    font-size: 128px;
    font-weight: 900;
    text-align: center;
    font-family: ${(props) =>  props.theme.fontFamily.outfit};
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

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  tokenId,
  ownerAddress,
}) => {
  const [glitchTokenId, setGlitchTokenId] = useState(tokenId);
  const [glitchOwner, setGlitchOwner] = useState(
    truncateWalletAddress(ownerAddress)
  );
  const [subheadingText, setSubheadingText] = useState("Asset Owner");

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
