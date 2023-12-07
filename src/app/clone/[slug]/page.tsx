"use client";

import Image from "next/image";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CloneData } from "../../../types";
import { HeaderInfo } from "../../../components/HeaderInfo/HeaderInfo";

const GET_TOKEN_DATA_QUERY = gql`
  query GetTokens($id: String!) {
    token(id: $id) {
      id
      metadata {
        id
        image
      }
      owner {
        id
      }
      transferHistory {
        id
        gasPrice
        receiver {
          id
        }
        sender {
          id
        }
        transactionHash
        timestamp
        blockNumber
      }
    }
  }
`;

const Container = styled.div`
  .container {
    display: flex;
    flex-direction: row;

    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }

  .image-section {
    width: 55%;

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
    width: 45%;
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
  const renderTokenMetaData = () => {
    if (!typedData || !typedData.token) {
      return null;
    }

    return (
      <Container key={uuidv4()}>
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
            />
          </div>
        </div>
      </Container>
    );
  };

  return <div>{renderTokenMetaData()}</div>;
}
