import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { TransferIcon } from "../Icons";
import { Transfer } from "../../types";
import { shortenAddress, timeAgo } from "../../utils";

const TransactionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 25px 30px;
  font-family: ${(props) => props.theme.fontFamily.robotoFlex};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.colors.white};
  y-overflow: scroll;

  .transfer-item {
    border: 1px solid ${(props) => props.theme.colors.slateGrey};
    border-bottom: none;
    padding: 20px 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .show-more-wrapper {
    border: 1px solid ${(props) => props.theme.colors.slateGrey};
    border-top: none;
    padding: 15px 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: ${(props) => props.theme.colors.slateGrey};
    cursor: pointer;
  }

  .transfer-icon {
    height: 25px;
    width: 25px;
    margin-right: 10px;
  }

  .transfer-icon .icon {
    align-items: center;
    justify-content: center;
  }

  .transfer-type,
  .transfer-from,
  .transfer-to,
  .transfer-time {
  }

  .transfer-time {
  }

  .bottom {
    border-bottom: 1px solid ${(props) => props.theme.colors.slateGrey};
  }

  .transfer-icon-wrapper {
    display: flex;
    flex-direction: row;
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
  loadMoreTokens: () => void;
  canLoadMore: boolean;
}

export const TransactionList: React.FC<TraitListProps> = ({
  transactions,
  loadMoreTokens,
  canLoadMore,
}) => {
  const lastIndex = transactions.length - 1;

  const renderTransactions = () => {
    return transactions.map((transaction, index) => {
      const date = timeAgo(Number(transaction.blockTimestamp));
      const to = shortenAddress(transaction.to);
      const from = shortenAddress(transaction.from);

      let extraStyles: string = "";
      if (index == lastIndex) {
        extraStyles = "bottom";
      }

      return (
        <div key={uuidv4()} className={`transfer-item ${extraStyles}`}>
          <div className="transfer-icon-wrapper">
            <div className="transfer-icon">
              <TransferIcon />
            </div>
            <div className="transfer-type">Transfer</div>
          </div>
          <div className="transfer-from">{from}</div>
          <div className="transfer-to">{to}</div>
          <div className="transfer-time">{date}</div>
        </div>
      );
    });
  };
  console.log("transactions", transactions);
  return (
    <TransactionListContainer>
      {renderTransactions()}
      {canLoadMore ? (
        <div className="show-more-wrapper">
          <div onClick={loadMoreTokens} className="show-more">
            Show More
          </div>
        </div>
      ) : null}
    </TransactionListContainer>
  );
};
