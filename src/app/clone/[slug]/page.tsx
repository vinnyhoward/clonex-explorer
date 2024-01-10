"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { TokenDataQueryResult } from "../../../types";
import { HeaderInfo } from "../../../components/HeaderInfo/HeaderInfo";
import { TraitList } from "../../../components/TraitList/TraitList";
import { TransactionList } from "../../../components/TransactionList/TransactionList";
import { GET_TOKEN_DATA_QUERY } from "../../../graphql/tokenQueries";
import {
  CloneTraits,
  CloneTraitsList,
  Section,
  Transfer,
} from "../../../types";

const Container = styled.div`
  .container {
    display: flex;
    flex-direction: row;

    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }

  .image-section {
    width: 60%;

    @media (max-width: 1200px) {
      width: 100%;
    }

    @media (max-width: 750px) {
      width: 100%;
      height: 500px;
    }
  }

  .clone-image {
    height: 100vh;
    width: 100%;
    object-fit: cover;
    margin: 0;
    padding: 0;

    @media (max-width: 750px) {
      width: 100%;
      height: 500px;
    }
  }

  .info-section {
    width: 40%;
    background-color: ${(props) => props.theme.colors.darkerBlue};
    height: 100vh;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    @media (max-width: 1200px) {
      width: 100%;
    }
  }

  .info-section::-webkit-scrollbar {
    display: none;
  }
`;

const QUERY_SIZE = 5;
export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const [section, setSection] = useState(Section.TraitList);
  const [traits, setTraits] = useState<CloneTraitsList[]>([]);
  const [transactions, setTransactions] = useState<Transfer[]>([]);
  const [loadingTransactions, setLoadingTransactions] =
    useState<boolean>(false);
  const [loadingTraits, setLoadingTraits] = useState<boolean>(true);
  const [skipAmount, setSkipAmount] = useState<number>(0);
  const { data, fetchMore } = useSuspenseQuery(GET_TOKEN_DATA_QUERY, {
    variables: { id: slug, first: QUERY_SIZE, skip: skipAmount },
  });
  const typedData = data as TokenDataQueryResult;

  const loadMoreTokens = async () => {
    setLoadingTransactions(true);
    if (!typedData.token) {
      return setLoadingTransactions(false);
    }

    const currentSkipAmount = skipAmount;
    const response = await fetchMore({
      variables: {
        id: slug,
        first: QUERY_SIZE,
        skip: currentSkipAmount,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        setTransactions((prev) => {
          if (!prev) return fetchMoreResult.transfers;
          if (!fetchMoreResult.transfers) return [...prev];
          return [...prev, ...fetchMoreResult.transfers];
        });
      },
    });

    if (response.networkStatus === 7) {
      setSkipAmount(currentSkipAmount + QUERY_SIZE);
    }
    setLoadingTransactions(false);
  };

  const renderSection = () => {
    switch (section) {
      case Section.TraitList:
        return <TraitList loading={loadingTraits} traits={traits} />;
      default:
        return (
          <TransactionList
            loadMoreTokens={loadMoreTokens}
            transactions={transactions}
            loading={loadingTransactions}
          />
        );
    }
  };

  const renderTokenMetaData = () => {
    return (
      <Container>
        <div className="container">
          <div className="image-section">
            <Image
              width={1000}
              height={1000}
              className="clone-image"
              src={typedData.token.metadata.image}
              alt={`Clone#${typedData.token.id}`}
            />
          </div>

          <div className="info-section">
            <HeaderInfo
              tokenId={typedData.token.id}
              ownerAddress={typedData.token.owner.id}
              setSection={setSection}
              section={section}
            />
            {renderSection()}
          </div>
        </div>
      </Container>
    );
  };

  useEffect(() => {
    const getTraitData = async () => {
      try {
        if (!typedData.token) return;
        setLoadingTraits(true);
        const fetchedData = await fetch(
          `/api/get-clone-details/${encodeURIComponent(typedData.token.id)}`
        );
        const dataJson: CloneTraits = await fetchedData.json();
        const traits: CloneTraitsList[] = JSON.parse(dataJson.attributes);
        setTraits(traits);
      } catch (error) {
        console.error("Error fetching trait data:", error);
      } finally {
        setLoadingTraits(false);
      }
    };

    getTraitData();
  }, []);

  useEffect(() => {
    if (!typedData.transfers) return;

    setTransactions(typedData.transfers);
  }, [typedData.transfers, transactions]);

  return <div>{renderTokenMetaData()}</div>;
}
