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

    return (
      <div key={uuidv4()}>
        <div>
          Placeholder
        </div>
      </div>
    );
  };

  console.log("typed data:", typedData.token);
  return <div>{renderTokenMetaData()}</div>;
}
