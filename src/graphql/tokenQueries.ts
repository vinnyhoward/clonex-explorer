import { gql } from "@apollo/client";

export const GET_TOKENS_QUERY = gql`
  query GetTokens($id: String, $first: Int!, $skip: Int!) {
    tokens(id: $id, first: $first, skip: $skip) {
      id
      tokenId
      metadata {
        image
      }
    }
  }
`;

export const GET_SINGLE_TOKEN_QUERY = gql`
  query GetSingleToken($id: String!) {
    token(id: $id) {
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

    transfers(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { tokenId: $id }
    ) {
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

export const SEARCH_TOKENS_BY_ID_QUERY = gql`
  query SearchTokensById($tokenId: String!, $first: Int!, $skip: Int!) {
    tokens(where: { tokenId: $tokenId }, first: $first, skip: $skip) {
      id
      tokenId
      metadata {
        image
      }
    }
  }
`;

export const OVERALL_ACTIVITY_QUERY = gql`
  query OverallActivity($first: Int!, $skip: Int!) {
    transfers(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
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
