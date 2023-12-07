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
  }

  .image-section {
    width: 60%;
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

  console.log("typed data:", typedData.token);
  return <div>{renderTokenMetaData()}</div>;
}
