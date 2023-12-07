import React from "react";
import styled from "styled-components";

const HeaderInfoContainer = styled.div`
  padding: 20px;

  h2 {
    font-size: 8rem;
    font-weight: 900;
    text-align: center;
  }

  .owner-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0;
    border-top: 1px solid ${(props) => props.theme.colors.darkBlue};
    border-bottom: 1px solid ${(props) => props.theme.colors.darkBlue};
    text-transform: uppercase;
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
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
  const truncateWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  };
  const owner = truncateWalletAddress(ownerAddress);
  return (
    <HeaderInfoContainer>
      <h2>{tokenId}</h2>
      <div className="owner-container">
        <p>Asset Owner</p>
        <p>{owner}</p>
      </div>
    </HeaderInfoContainer>
  );
};
