import React, { useCallback } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Skeleton from "react-loading-skeleton";
import { TransferIcon } from "../Icons";
import { Transfer } from "@/types";
import { shortenAddress, timeAgo } from "@/utils";
import { Loader } from "../Loader/Loader";

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

    @media (max-width: 500px) {
      display: none;
    }
  }

  .transfer-icon .icon {
    align-items: center;
    justify-content: center;
  }

  .transfer-from,
  .transfer-to,
  .transfer-time {
    @media (max-width: 450px) {
      font-size: ${(props) => props.theme.fontSize.sm};
    }
  }

  .transfer-type {
    @media (max-width: 450px) {
      display: none;
    }
  }

  .bottom {
    border-bottom: 1px solid ${(props) => props.theme.colors.slateGrey};
  }

  .transfer-icon-wrapper {
    display: flex;
    flex-direction: row;
  }

  .table-header {
    padding: 5px 30px;
    margin-left: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: ${(props) => props.theme.fontFamily.robotoFlex};
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSize.md};
    color: ${(props) => props.theme.colors.slateGrey};
  }
`;

interface TraitListProps {
  transactions: Transfer[];
  loadMoreTokens: () => void;
  loading: boolean;
}

export const TransactionList: React.FC<TraitListProps> = ({
  transactions,
  loadMoreTokens,
  loading,
}) => {
  const lastIndex = transactions.length - 1;

  const renderTransactions = useCallback(() => {
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
            {loading ? (
              <Skeleton
                width={90}
                baseColor="#DDDDDD"
                highlightColor="#9B9B9B"
                duration={1}
              />
            ) : (
              <>
                <div className="transfer-icon">
                  <TransferIcon />
                </div>
                <div className="transfer-type">Transfer</div>
              </>
            )}
          </div>
          <div className="transfer-from">
            {loading ? (
              <Skeleton
                width={90}
                baseColor="#DDDDDD"
                highlightColor="#9B9B9B"
                duration={1}
              />
            ) : (
              from
            )}
          </div>
          <div className="transfer-to">
            {loading ? (
              <Skeleton
                width={90}
                baseColor="#DDDDDD"
                highlightColor="#9B9B9B"
                duration={1}
              />
            ) : (
              to
            )}
          </div>
          <div className="transfer-time">
            {loading ? (
              <Skeleton
                width={90}
                baseColor="#DDDDDD"
                highlightColor="#9B9B9B"
                duration={1}
              />
            ) : (
              date
            )}
          </div>
        </div>
      );
    });
  }, [transactions, loading, lastIndex]);
  return (
    <TransactionListContainer>
      <div className="table-header">
        <div className="transfer-type"></div>
        <div className="transfer-from">From</div>
        <div className="transfer-to">To</div>
        <div className="transfer-time">Time</div>
      </div>
      {renderTransactions()}

      <div className="show-more-wrapper">
        <div onClick={loadMoreTokens} className="show-more">
          {loading ? <Loader /> : "Show More"}
        </div>
      </div>
    </TransactionListContainer>
  );
};
