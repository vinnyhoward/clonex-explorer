import React from "react";
import styled from "styled-components";

const TraitListContainer = styled.div`
  /* Add your styling here */
`;

interface TraitListProps {}

async function getData(tokenId: string) {
  const res = await fetch(`/api/get-clone-details/${tokenId}}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const TraitList: React.FC<TraitListProps> = async () => {
  const data = await getData("1");
  console.log("data", data);
  return (
    <TraitListContainer>
      {/* Add your component content here */}
    </TraitListContainer>
  );
};
