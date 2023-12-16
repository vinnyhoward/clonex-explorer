import { gql } from "@apollo/client";

export const GET_TOKENS_QUERY = gql`
  query GetTokens($first: Int!, $skip: Int!) {
    tokens(first: $first, skip: $skip) {
      id
      tokenId
      metadata {
        image
      }
    }
  }
`;

export const GET_TOKEN_DATA_QUERY = gql`
  query GetTokenData($id: String!, $first: Int!, $skip: Int!) {
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

    transfers(first: $first, skip: $skip, where: { tokenId: $id }) {
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
