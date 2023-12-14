import React from "react";
import styled from "styled-components";
import { TransferIcon } from "../Icons";
import { Transfer } from "../../types";
import { shortenAddress, timeAgo } from "../../utils";

const TransactionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 25px 30px;
  font-family: ${(props) => props.theme.fontFamily.robotoFlex};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.md};

  .transfer-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  .transfer-item:last-child {
    border-bottom: none;
  }

  .transfer-icon {
  }

  .transfer-icon .icon {
  }

  .transfer-type,
  .transfer-from,
  .transfer-to,
  .transfer-time {
    margin-left: 10px;
    color: #333;
  }

  .transfer-time {
    margin-left: auto;
  }

  .transfer-item:hover {
    background: #f6f6f6;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .transfer-item {
      flex-direction: column;
      align-items: start;
    }
    .transfer-time {
      margin-left: 0;
      margin-top: 5px;
    }
  }
`;

interface TraitListProps {
  transactions: Transfer[];
}

export const TransactionList: React.FC<TraitListProps> = ({ transactions }) => {
  const renderTransactions = () => {
    return transactions.map((transaction) => {
      const date = timeAgo(Number(transaction.blockTimestamp));
      const to = shortenAddress(transaction.to);
      const from = shortenAddress(transaction.from);

      return (
        <div key={transaction.id} className="transfer-item">
          <div className="transfer-icon">
            <TransferIcon />
          </div>
          <div className="transfer-type">Transfer</div>
          <div className="transfer-from">{from}</div>
          <div className="transfer-to">{to}</div>
          <div className="transfer-time">
           {date}
          </div>
        </div>
      );
    });
  };

  console.log("transactions", transactions);
  return (
    <TransactionListContainer>{renderTransactions()}</TransactionListContainer>
  );
};
