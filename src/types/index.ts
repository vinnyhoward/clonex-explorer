export type Token = {
  __typename: "Token";
  id: string;
  metadata: Metadata;
  owner: Account;
  transferHistory: TransferHistory[];
};

export type Metadata = {
  __typename: "Metadata";
  id: string;
  image: string;
};

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

export type QueryData = {
  token: Token[];
};

export type QueriesData = {
    tokens: Token[];
  };
  