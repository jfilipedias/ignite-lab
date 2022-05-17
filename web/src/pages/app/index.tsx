import React from "react";

import { GetServerSideProps, NextPage } from "next";

import { gql, useQuery } from "@apollo/client";
import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";

import { withApollo } from "../../lib/withApollo";

const PRODUCT_QUERY = gql`
  query GetProducts {
    products {
      id
      title
    }
  }
`;

const Home: NextPage = () => {
  const { user } = useUser();
  const { data } = useQuery(PRODUCT_QUERY);

  return (
    <div>
      <h1>Hello World</h1>

      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>

      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    console.log(getAccessToken(req, res));

    return {
      props: {},
    };
  },
});

export default withApollo(Home);
