import { gql } from "@apollo/client";

export const GET_TOKENS_QUERY = gql`
query GetTokens($first: Int!, $after: ID) {
  tokens(first: $first, after: $after) {
    id
    tokenId
    metadata {
      image
    }
  }
}
`;

export const GET_TOKEN_DATA_QUERY = gql`
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