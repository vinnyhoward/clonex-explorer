"use client";

import { gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { QueryData } from "../../../types";

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

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { data, fetchMore } = useSuspenseQuery(GET_TOKEN_DATA_QUERY, {
    variables: { id: slug },
  });
  const typedData = data as QueryData;

  const renderTokenMetaData = () => {
    if (!typedData || !typedData.token) {
      return null;
    }

    return typedData?.token?.map((token) => {
      return (
        <div key={uuidv4()}>
          <div>
            <h2>{token.id}</h2>
            <h2>{token.metadata.id}</h2>
            <h2>{token.metadata.image}</h2>
          </div>
        </div>
      );
    });
  };

  console.log("typedData:", typedData.token);
  return <div>{renderTokenMetaData()}</div>;
}
