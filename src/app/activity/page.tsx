"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Skeleton from "react-loading-skeleton";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { OVERALL_ACTIVITY_QUERY } from "@/graphql/tokenQueries";
import { Transfer } from "@/types";
import { shortenAddress, timeAgo } from "@/utils";
import { TransferIcon } from "@/components/Icons/TransferIcon";
import { useViewportSize } from "@/hooks/useViewportSize";
import { Loader } from "@/components/Loader/Loader";
import { fetchBase64ForToken } from "@/utils/fetchBase64ForToken";

const ActivityContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.blueCharcoal};
  width: 100%;
  margin-bottom: 100px;

  .empty-transactions-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px 30px;
    color: ${(props) => props.theme.colors.slateGrey};
  }

  .empty-text {
    font-size: ${(props) => props.theme.fontSize.md};
    height: 300px;
    padding: 30px 30px;
  }

  h1 {
    margin: 50px 0px 20px 0px;
    font-family: ${(props) => props.theme.fontFamily.robotoFlex};
    font-weight: 700;
    font-size: ${(props) => props.theme.fontSize.xxxl};
    color: ${(props) => props.theme.colors.white};

    @media (max-width: 400px) {
      font-size: ${(props) => props.theme.fontSize.xxl};
      margin: 25px 0px 10px 0px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    max-width: 92%;
  }

  thead {
    background-color: transparent;
  }

  tbody {
    border-right: 1px solid ${(props) => props.theme.colors.slateGrey};
    border-left: 1px solid ${(props) => props.theme.colors.slateGrey};
  }

  th {
    text-align: left;
    padding: 5px 20px;
    color: ${(props) => props.theme.colors.periwinkle};
    font-family: ${(props) => props.theme.fontFamily.robotoFlex};
    font-weight: 500;

    @media (max-width: 400px) {
      padding: 15px 10px;
    }
  }

  td {
    text-align: left;
    background-color: ${(props) => props.theme.colors.charcoal};
    border-bottom: 1px solid ${(props) => props.theme.colors.slateGrey};
    padding: 15px 20px;

    @media (max-width: 400px) {
      padding: 15px 10px;
    }
  }

  td:first-child {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
  }

  .top {
    border-top: 1px solid ${(props) => props.theme.colors.slateGrey};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
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

    span {
      @media (max-width: 800px) {
        display: none;
      }
    }
  }

  .clone-image {
    border-radius: 8px;
  }

  .transfer-wrapper {
    display: flex;
    flex-direction: row;

    @media (max-width: 800px) {
      display: none;
    }
  }

  .transfer-placeholder {
    display: flex;
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

    @media (max-width: 1000px) {
      margin-left: 25px;
    }

    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }

  .table-r-margin {
    margin-right: 75px;

    @media (max-width: 1000px) {
      margin-right: 25px;
    }

    @media (max-width: 500px) {
      margin-right: 0px;
    }
  }

  .show-more-wrapper {
    background-color: ${(props) => props.theme.colors.charcoal};
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
    width: 92%;
  }

  .block-number,
  .txn-hash,
  .transfer {
    @media (max-width: 800px) {
      display: none;
    }
  }
`;

const QUERY_SIZE = 50;
export default function Page() {
  const [skipAmount, setSkipAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transfer[]>([]);
  const { fetchMore } = useSuspenseQuery(OVERALL_ACTIVITY_QUERY, {
    variables: { first: QUERY_SIZE, skip: skipAmount },
  });
  const { width } = useViewportSize();

  const loadMoreTransactions = async () => {
    setLoading(true);
    if (loading) {
      return setLoading(false);
    }

    try {
      const currentSkipAmount = skipAmount;
      const response = await fetchMore({
        variables: {
          first: QUERY_SIZE,
          skip: currentSkipAmount,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;

          const updatedTransfer = fetchMoreResult.transfers.map(
            async (transfer: any) => {
              const base64Image = await fetchBase64ForToken(transfer.tokenId);
              return { ...transfer, base64Image };
            }
          );

          Promise.all(updatedTransfer).then((tokensWithBase64) => {
            setTransactions((prevTokens) => {
              if (!prevTokens) return tokensWithBase64;
              return [...prevTokens, ...tokensWithBase64];
            });
          });
        },
      });
      if (response.networkStatus === 7) {
        const newSkipAmount = currentSkipAmount + QUERY_SIZE;
        setSkipAmount(newSkipAmount);
      }
    } catch (error) {
      console.error("Error fetching more tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreTransactions();
  }, []);

  const renderTransactionsActivity = () => {
    if (loading) {
      return Array.from({ length: 10 }).map(() => {
        return (
          <tr key={uuidv4()} className="top">
            <td className="transfer">
              <div className="transfer-wrapper">
                <div className="transfer-icon table-l-margin">
                  <Skeleton
                    width={25}
                    baseColor="#404451"
                    highlightColor="#9B9B9B"
                    duration={1}
                  />
                </div>
                <p className="transfer-text">
                  <Skeleton
                    width={80}
                    baseColor="#404451"
                    highlightColor="#9B9B9B"
                    duration={1}
                  />
                </p>
              </div>
            </td>
            <td>
              <div className="image-name">
                <Skeleton
                  width={45}
                  height={45}
                  baseColor="#404451"
                  highlightColor="#9B9B9B"
                  duration={1}
                />
                <div className="clone-name">
                  <Skeleton
                    width={80}
                    baseColor="#404451"
                    highlightColor="#9B9B9B"
                    duration={1}
                  />
                </div>
              </div>
            </td>
            <td>
              <Skeleton
                width={80}
                baseColor="#404451"
                highlightColor="#9B9B9B"
                duration={1}
              />
            </td>
            <td>
              <Skeleton
                width={80}
                baseColor="#404451"
                highlightColor="#9B9B9B"
                duration={1}
              />
            </td>
            <td className="block-number">
              <Skeleton
                width={80}
                baseColor="#404451"
                highlightColor="#9B9B9B"
                duration={1}
              />
            </td>
            <td className="txn-hash">
              <Skeleton
                width={80}
                baseColor="#404451"
                highlightColor="#9B9B9B"
                duration={1}
              />
            </td>
            <td>
              <div className="table-r-margin">
                <Skeleton
                  width={80}
                  baseColor="#404451"
                  highlightColor="#9B9B9B"
                  duration={1}
                />
              </div>
            </td>
          </tr>
        );
      });
    }
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

      const fallBackBase64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAABjElEQVR4nAXBW0hTcQDA4f9TDz31lj0ZezITAksxgsAgiB7E0awwQQeSIJQGIY1eIlOYKHh20elOZ2cXnPOWl8kuqYVLhRRJFFIEwYRYIRPdjuZ29Nf3CVtIQwpkkAbS2CdyuGJJxufj+HbTyCnwaud4T0FIgxrd/iOkoI4ruE7bKxMjHY9IROwEkmmUNKjaOcI2pmEbOsY5coD5SQV3Ci7x8JaBt5UFeGKfUDLgSeUQjphGz2ewKovcLy3EdO82zXWPeff8KR9kP+o+yL+yCNf3E1wrYB9doaulkZfmahLDMptLcXyrf+jdOKN/4xTh3s7i3oG+6A98XZ1YzDVEvQ6+TEbo/ZbF+fUfPfMnCOWvjpyE4M5voqE2qsvLeGYyMepoYHx2EVtYxz6hIdTDHOoZ9AWcTFuuYH1xDYvxLpudF1lw5iP1L9M9pCM+6jCTXEN9fYPa4gu435TQWv+AcEseiXYD4ck5OnwgxlJ7TFmvM2i5zJK7EE/zVd43VfEzVERm4SZHq0aU4S3+A2D9IiYNi5PAAAAAAElFTkSuQmCC";
      const iconSize = width && width < 400 ? 20 : 45;
      return (
        <tr key={uuidv4()} className={extraStyles}>
          <td className="transfer">
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
                  width={iconSize}
                  height={iconSize}
                  className="clone-image"
                  blurDataURL={transaction.base64Image || fallBackBase64Image}
                  placeholder="blur"
                  src={`https://clonex-assets.rtfkt.com/images/${tokenId}.png`}
                  alt={`Clone#${tokenId}`}
                />
                <div className="clone-name">
                  <span>CloneX</span>#{tokenId}
                </div>
              </div>
            </Link>
          </td>
          <td>{from}</td>
          <td>{to}</td>
          <td className="block-number">{blockNumber}</td>
          <td className="txn-hash">{transactionHash}</td>
          <td>
            <div className="table-r-margin">{date}</div>
          </td>
        </tr>
      );
    });
  };

  return (
    <ActivityContainer>
      <h1>Transaction Activity</h1>
      <table>
        <thead>
          <tr>
            <th className="transfer"></th>
            <th>Name</th>
            <th>From</th>
            <th>To</th>
            <th className="block-number">Block No.</th>
            <th className="txn-hash">Txn Hash</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{renderTransactionsActivity()}</tbody>
      </table>

      {transactions.length !== 0 ? (
        <div className="show-more-wrapper">
          <div onClick={() => loadMoreTransactions()} className="show-more">
            {loading ? <Loader /> : "Show More"}
          </div>
        </div>
      ) : (
        <div className="empty-transactions-container">
          <p className="empty-text">There are no more transactions to show</p>
        </div>
      )}
    </ActivityContainer>
  );
}
