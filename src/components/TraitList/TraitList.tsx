import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CloneTraits, CloneTraitsList } from "../../types";

const TraitListContainer = styled.div`
  /* Add your styling here */
`;

interface TraitListProps {
  tokenId: string;
}
export const TraitList: React.FC<TraitListProps> = ({ tokenId }) => {
  const [traits, setTraits] = useState<CloneTraitsList>();
  useEffect(() => {
    const getTraitData = async () => {
      const data = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/get-clone-details/${encodeURIComponent(tokenId)}`
      );
      const dataJson: CloneTraits = await data.json();
      const traits: CloneTraitsList = JSON.parse(dataJson.attributes);
      setTraits(traits);
    };

    getTraitData();
  }, [tokenId]);

  console.log("traits:", traits);
  return (
    <TraitListContainer>
      {/* Add your component content here */}
    </TraitListContainer>
  );
};
