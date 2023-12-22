"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { OVERALL_ACTIVITY_QUERY } from "@/graphql/tokenQueries";
import { v4 as uuidv4 } from "uuid";
import { Transfer } from "@/types";
import { shortenAddress, timeAgo } from "../../utils";
import { TransferIcon } from "../../components/Icons";

const ActivityContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.blueCharcoal};

  table {
    width: 100%;
    border-collapse: collapse;
    max-width: 92%;
    margin: 50px 0px;
  }

  thead {
    background-color: transparent;
  }

  tbody {
    border-right: 1px solid ${(props) => props.theme.colors.slateGrey};
    border-left: 1px solid ${(props) => props.theme.colors.slateGrey};
  }

  tr {
  }

  th {
    text-align: left;
    padding: 5px 20px;
    color: ${(props) => props.theme.colors.periwinkle};
    font-family: ${(props) => props.theme.fontFamily.robotoFlex};
    font-weight: 500;
  }

  td {
    text-align: left;
    background-color: ${(props) => props.theme.colors.charcoal};
    border-bottom: 1px solid ${(props) => props.theme.colors.slateGrey};
    padding: 15px 20px;
  }

  .top {
    border-top: 1px solid ${(props) => props.theme.colors.slateGrey};
  }

  .image-name {
    display: flex;
    flex-direction: row;
  }

  .clone-name {
    font-family: ${(props) => props.theme.fontFamily.robotoFlex};
    font-weight: 700;
    font-size: ${(props) => props.theme.fontSize.md};
    color: ${(props) => props.theme.colors.white};
    margin-left: 12.5px;
    align-self: center;
  }

  .clone-image {
    border-radius: 8px;
  }

  .transfer-wrapper {
    display: flex;
    flex-direction: row;
  }

  .transfer-text {
    font-family: ${(props) => props.theme.fontFamily.robotoFlex};
    font-weight: 700;
    font-size: ${(props) => props.theme.fontSize.md};
    color: ${(props) => props.theme.colors.white};
    align-self: center;
    margin-left: 50px;
  }

  .transfer-icon {
  }

  .table-l-margin {
    margin-left: 75px;
  }

  .table-r-margin {
    margin-right: 75px;
  }
`;

const QUERY_SIZE = 50;
export default function Page() {
  const [skipAmount, setSkipAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transfer[]>([]);
  const { data, fetchMore } = useSuspenseQuery(OVERALL_ACTIVITY_QUERY, {
    variables: { first: QUERY_SIZE, skip: skipAmount },
  });

  const loadMoreTransactions = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const nextScrollPosition = window.scrollY;

    try {
      const currentSkipAmount = skipAmount;
      const response = await fetchMore({
        variables: {
          first: QUERY_SIZE,
          skip: currentSkipAmount,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;

          console.log("fetch more result:", fetchMoreResult);
          setTransactions((prevTokens) => {
            if (!prevTokens) return fetchMoreResult.transfers;
            return [...prevTokens, ...fetchMoreResult.transfers];
          });

          const newSkipAmount = currentSkipAmount + QUERY_SIZE;
          setSkipAmount(newSkipAmount);
        },
      });

      if (response.networkStatus === 7) {
        window.scrollTo(0, nextScrollPosition - 100);
      }
    } catch (error) {
      console.error("Error fetching more tokens:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMoreTransactions();
  }, []);

  const renderTransactionsActivity = () => {
    return transactions.map((transaction, index) => {
      const { tokenId, blockNumber } = transaction;
      const date = timeAgo(Number(transaction.blockTimestamp));
      const to = shortenAddress(transaction.to);
      const from = shortenAddress(transaction.from);
      const transactionHash = shortenAddress(transaction.transactionHash);
      let extraStyles: string = "";
      if (index == 0) {
        extraStyles = "top";
      }

      return (
        <tr key={uuidv4()} className={extraStyles}>
          <td>
            <div className="transfer-wrapper">
              <div className="transfer-icon table-l-margin">
                <TransferIcon />
              </div>
              <p className="transfer-text">Transfer</p>
            </div>
          </td>
          <td>
            <Link href={`/clone/${tokenId}`}>
              <div className="image-name">
                <Image
                  width={45}
                  height={45}
                  className="clone-image"
                  src={`https://clonex-assets.rtfkt.com/images/${tokenId}.png`}
                  alt={`Clone#${tokenId}`}
                />
                <div className="clone-name">Clone#{tokenId}</div>
              </div>
            </Link>
          </td>
          <td>{from}</td>
          <td>{to}</td>
          <td>{blockNumber}</td>
          <td>{transactionHash}</td>
          <td>
            <div className="table-r-margin">{date}</div>
          </td>
        </tr>
      );
    });
  };
  return (
    <ActivityContainer>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>From</th>
            <th>To</th>
            <th>Block No.</th>
            <th>Txn Hash</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{renderTransactionsActivity()}</tbody>
      </table>
    </ActivityContainer>
  );
}