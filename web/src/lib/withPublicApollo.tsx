import React from "react";

import { GetServerSidePropsContext, NextPage } from "next";

import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export type ApolloClientContext = GetServerSidePropsContext;

export function getApolloClient(
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject
): ApolloClient<any> {
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

export const withPublicApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    const { apolloState } = props;

    return (
      <ApolloProvider client={getApolloClient(undefined, apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};
