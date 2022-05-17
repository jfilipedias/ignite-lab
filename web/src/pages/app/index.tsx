import React from "react";

import { GetServerSideProps, NextPage } from "next";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { ssrGetProducts } from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

const Home: NextPage = ({ data }: any) => {
  const { user } = useUser();
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
  getServerSideProps: async (ctx) => {
    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
