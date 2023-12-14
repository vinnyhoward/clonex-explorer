"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { TokenDataQueryResult } from "../../../types";
import { HeaderInfo } from "../../../components/HeaderInfo/HeaderInfo";
import { TraitList } from "../../../components/TraitList/TraitList";
import { TransactionList } from "../../../components/TransactionList/TransactionList";
import { GET_TOKEN_DATA_QUERY } from "../../../graphql/tokenQueries";
import { CloneTraits, CloneTraitsList, Section } from "../../../types";

const Container = styled.div`
  .container {
    display: flex;
    flex-direction: row;

    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }

  .image-section {
    width: 60%;

    @media (max-width: 1200px) {
      width: 100%;
    }
  }

  .clone-image {
    height: 100vh;
    width: 100%;
    object-fit: cover;
    margin: 0;
    padding: 0;
  }

  .info-section {
    width: 40%;
    background-color: ${(props) => props.theme.colors.darkerBlue};
    height: 100vh;

    @media (max-width: 1200px) {
      width: 100%;
    }
  }
`;

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { data } = useSuspenseQuery(GET_TOKEN_DATA_QUERY, {
    variables: { id: slug },
  });
  const typedData = data as TokenDataQueryResult;
  const [section, setSection] = useState(Section.TraitList);
  const [traits, setTraits] = useState<CloneTraitsList[]>([]);

  const renderTokenMetaData = () => {
    if (!typedData || !typedData.token) {
      return null;
    }

    const renderSection = () => {
      switch (section) {
        case Section.TraitList:
          return <TraitList traits={traits} />;
        default:
          return <TransactionList transactions={typedData.transfers} />;
      }
    };

    return (
      <Container>
        <div className="container">
          <div className="image-section">
            <Image
              width={1000}
              height={1000}
              className="clone-image"
              src={typedData.token.metadata.image}
              alt={`Clone#${typedData.token.id}`}
            />
          </div>

          <div className="info-section">
            <HeaderInfo
              tokenId={typedData.token.id}
              ownerAddress={typedData.token.owner.id}
              setSection={setSection}
              section={section}
            />
            {renderSection()}
          </div>
        </div>
      </Container>
    );
  };

  useEffect(() => {
    const getTraitData = async () => {
      const fetchedData = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/get-clone-details/${encodeURIComponent(typedData.token.id)}`
      );
      const dataJson: CloneTraits = await fetchedData.json();
      const traits: CloneTraitsList[] = JSON.parse(dataJson.attributes);
      setTraits(traits);
    };

    getTraitData();
  }, [typedData.token.id]);  

  return <div>{renderTokenMetaData()}</div>;
}
