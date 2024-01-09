# CloneX Frontend Application

![CloneX](/assets/clonex.jpg)

This Next.js application is designed to interact with the CloneX subgraph, providing a user-friendly interface to access and display data from the CloneX NFT collection. Built with TypeScript and leveraging Next Functions for server-side operations, this application is a simple and efficient way to explore CloneX NFT data.

1. Clone the repository:

```bash
git clone https://your-repository-url.git
cd your-repository-folder
```

2. Install the dependencies

```bash
npm install
```

3. Start the development server and open `http://localhost:3000` with your browser to see the result.

```bash
npm run dev
```


## File Structure

- app/: Contains the page components.
- components/: Reusable components used throughout the application.
- lib/: Library code for interacting with the CloneX subgraph.
- public/: Static files like images and fonts.
- styles/: Global styles and theme-related files.

## Consuming the CloneX Subgraph
The application queries the CloneX subgraph using GraphQL. The queries are managed within the graphql/ directory. For GraphQL related set up, that is located in the lib/ directory

```js
import { gql, useQuery } from '@apollo/client';

const GET_NFT_DATA = gql`
  query GetNFTData($tokenId: String!) {
    nfts(where: { id: $tokenId }) {
      id
      owner {
        id
      }
      metadata {
        name
        image
      }
    }
  }
`;

export const useNFTData = (tokenId: string) => {
  const { data, loading, error } = useQuery(GET_NFT_DATA, {
    variables: { tokenId },
  });

  return { data, loading, error };
};

```

## Next Functions
The Next Functions are used for server-side operations like querying the subgraph. These are located in the app/api/ directory.

