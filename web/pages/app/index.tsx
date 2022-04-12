import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps, NextPage } from "next";

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello World</h1>

      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default Home;
