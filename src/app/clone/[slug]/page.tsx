"use client";

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CloneData } from "../../../types";
import { HeaderInfo } from "../../../components/HeaderInfo/HeaderInfo";
import { TraitList } from "../../../components/TraitList/TraitList";
import { GET_TOKEN_DATA_QUERY } from "../../../graphql/tokenQueries";
import { Section } from "./types";

const Container = styled.div`
  .container {
    display: flex;
    flex-direction: row;
    z @media (max-width: 1200px) {
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
  const typedData = data as CloneData;
  const [section, setSection] = useState(Section.TraitList);

  const renderTokenMetaData = () => {
    if (!typedData || !typedData.token) {
      return null;
    }

    return (
      <Container>
        <div className="container">
          <div className="image-section">
            <Image
              width={1000}
              height={1000}
              className="clone-image"
              src={typedData.token.metadata.image}
              alt={`Clone#${typedData.id}`}
            />
          </div>

          <div className="info-section">
            <HeaderInfo
              tokenId={typedData.token.id}
              ownerAddress={typedData.token.owner.id}
              setSection={setSection}
              section={section}
            />
            <TraitList />
          </div>
        </div>
      </Container>
    );
  };

  return <div>{renderTokenMetaData()}</div>;
}
