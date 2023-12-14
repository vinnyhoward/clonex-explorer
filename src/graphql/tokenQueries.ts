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
  query GetTokenData($id: String!) {
    token(id: $id) {
      id
      metadata {
        id
        image
      }
      owner {
        id
      }
    }

    transfers(first: 10, where: { tokenId: $id }) {
      blockNumber
      blockTimestamp
      from
      gasPrice
      id
      to
      tokenId
      transactionHash
    }
  }
`;

export const GET_TOKEN_TRANSACTION_HISTORY = gql`
  query GetTokenTransactions($id: String!, $first: Int!) {
    tokens(where: { id: $id }, first: $first) {
      transferHistory {
        receiver {
          id
        }
        sender {
          id
        }
        timestamp
        transactionHash
        blockNumber
      }
      tokenId
    }
  }
`;
