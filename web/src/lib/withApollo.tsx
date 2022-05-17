import React from "react";

import { NextPage } from "next";

import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

function getApolloClient(ssrCache?: NormalizedCacheObject): ApolloClient<any> {
  const httpLink = new HttpLink({
    uri: "http://localhost:3001/graphql",
    fetch,
  });

  const cache = new InMemoryCache().restore(ssrCache ?? {});

  return new ApolloClient({
    link: from([httpLink]),
    cache,
  });
}

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    const { apolloState } = props;

    return (
      <ApolloProvider client={getApolloClient(apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};
