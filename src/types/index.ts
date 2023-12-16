export interface Token {
  __typename: "Token";
  id: string;
  metadata: Metadata;
  owner: Owner;
  tokenId: string;
}

export interface Metadata {
  __typename: "Metadata";
  id: string;
  image: string;
}

export type Account = {
  __typename: "Account";
  id: string;
};

export type TransferHistory = {
  __typename: "TransferHistory";
  id: string;
  gasPrice: string;
  receiver: Account;
  sender: Account;
  transactionHash: string;
  timestamp: string;
  blockNumber: string;
};

export interface Owner {
  __typename: "Account";
  id: string;
}
export type TokenData = {
  id: string;
  metadata: Metadata;
  owner: Owner;
  transferHistory: TransferHistory[];
};
export interface TokenDataQueryResult {
  token: Token;
  transfers: Transfer[];
}

export type CloneDataList = {
  tokens: Token[];
};

export type CloneTraits = {
  id: number;
  token: string;
  name: string;
  attributes: string;
};

export type CloneTraitsList = {
  trait_type: string;
  value: string;
};

export interface Transfer {
  __typename: "Transfer";
  blockNumber: string;
  blockTimestamp: string;
  from: string;
  gasPrice: string;
  id: string;
  to: string;
  tokenId: string;
  transactionHash: string;
}

export interface TransfersQueryResult {
  transfers: Transfer[];
}

export enum Section {
  TraitList = "TraitList",
  TransactionList = "TransactionList",
}
