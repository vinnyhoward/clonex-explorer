import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import styled from "styled-components";
import { Section } from "../../app/clone/[slug]/types";
import { glitchText, GlitchMode } from "../../utils/glitchText";
import { truncateWalletAddress } from "../../utils/truncateWalletAddress";

const HeaderInfoContainer = styled.div`
  h2 {
    font-size: ${(props) => props.theme.fontSize.jumboXl};
    font-weight: 900;
    text-align: center;
    font-family: ${(props) => props.theme.fontFamily.outfit};
    margin: 10px 0;
  }

  .owner-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-top: 2px solid ${(props) => props.theme.colors.darkBlue};
    border-bottom: 2px solid ${(props) => props.theme.colors.darkBlue};
    text-transform: uppercase;
  }

  p {
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
    margin: 0;
    margin: 0 50px;
  }

  .owner-address {
    cursor: pointer;
  }

  .details-menu {
    position: relative;
    margin-top: 15px;
  }

  .tab-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
    text-transform: uppercase;
    border-bottom: 2px solid ${(props) => props.theme.colors.darkBlue};
  }

  .tab {
    cursor: pointer;
    color: ${(props) => props.theme.colors.slateGrey};

    p {
      font-size: ${(props) => props.theme.fontSize.md};
      font-weight: 600;
    }
  }

  .selected {
    color: ${(props) => props.theme.colors.yellow};
  }

  .yellow-line {
    position: absolute;
    bottom: 0;
    left: 0%;
    width: 50%;
    height: 2px;
    background-color: ${(props) => props.theme.colors.yellow};
  }

  .detail-outer-container {
    padding: 0 50px;
  }
`;

interface HeaderInfoProps {
  tokenId: string;
  ownerAddress: string;
  setSection: React.Dispatch<React.SetStateAction<Section>>;
  section: Section;
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  tokenId,
  ownerAddress,
  setSection,
  section,
}) => {
  const yellowLineRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (section === Section.TraitList) {
      gsap.to(yellowLineRef.current, {
        left: "0%",
        duration: 0.15,
        ease: "expo.inOut",
      });
    }

    if (section === Section.TransactionList) {
      gsap.to(yellowLineRef.current, {
        left: "50%",
        duration: 0.15,
        ease: "expo.inOut",
      });
    }
  }, [section]);

  const etherscanUrl = `https://etherscan.io/address/${ownerAddress}`;
  const isTraitListSelected = section === Section.TraitList;
  const isTransactionListSelected = section === Section.TransactionList;

  const traitClass = isTraitListSelected ? "tab selected" : "tab";
  const transactionClass = isTransactionListSelected ? "tab selected" : "tab";
  return (
    <HeaderInfoContainer>
      <h2>{glitchTokenId}</h2>
      <div className="owner-container">
        <p>{subheadingText}</p>
        <a href={etherscanUrl} target="_blank" rel="noopener noreferrer">
          <p className="owner-address">{glitchOwner}</p>
        </a>
      </div>

      <div className="detail-outer-container">
        <div className="details-menu">
          <div ref={yellowLineRef} className="yellow-line" />
          <div className="tab-container">
            <div
              className={traitClass}
              onClick={() => setSection(Section.TraitList)}
            >
              <p>Traits</p>
            </div>
            <div
              className={transactionClass}
              onClick={() => setSection(Section.TransactionList)}
            >
              <p>Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </HeaderInfoContainer>
  );
};
