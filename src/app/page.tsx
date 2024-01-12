"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Token } from "@/types";
import { CloneXLogo } from "@/components/CloneXLogo";
import { useCloneData } from "@/hooks/useCloneData";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  @media (max-width: 1300px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GridItem = styled.div`
  background-color: #f0f0f0;
  position: relative;
  width: 100%;

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SentinelDiv = styled.div`
  width: 100%;
  height: 1px;
`;

export default function Page() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { cloneData, loadMoreTokens, loading } = useCloneData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreTokens();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading, loadMoreTokens]);

  const renderGridItem = () => {
    if (!cloneData) return Array.from({ length: 100 }).map(() => null);

    return cloneData.map((token: Token) => (
      <GridItem key={uuidv4()}>
        <Link href={`/clone/${token.id}`}>
          <div className="content">
            <Image
              blurDataURL={token.metadata.base64Image}
              placeholder="blur"
              src={token.metadata.image}
              alt={`CloneX#${token.id}`}
              width={500}
              height={500}
            />
          </div>
        </Link>
      </GridItem>
    ));
  };

  return (
    <main>
      <div className="logo-wrapper">
        <CloneXLogo />
      </div>
      <Grid>
        {renderGridItem()}
        <SentinelDiv ref={sentinelRef} />
      </Grid>
    </main>
  );
}
