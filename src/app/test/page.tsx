"use client";

// import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

// Replace the existing query with the new one
const query = gql`
  {
    token(id: "4") {
      id
      owner {
        id
      }
      tokenId
    }
  }
`;

export default function Page() {
  const { data } = useSuspenseQuery(query);

  // Assuming you want to display the data in a similar manner
  // You might need to adjust this depending on the structure of 'data'
  return (
    <main>
      <div>Token ID: {data.token.id}</div>
      <div>Owner ID: {data.token.owner.id}</div>
      <div>Token ID: {data.token.tokenId}</div>
    </main>
  );
}
