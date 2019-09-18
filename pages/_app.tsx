import * as React from "react";
import App, { AppProps, AppContext } from "next/app";
import isEmpty from "lodash/isEmpty";
import { ApolloProvider } from "@apollo/react-hooks";
import { UIShell } from "../components/ui-shell";
import { AuthProvider } from "../components/auth";
import { cookies, ICookie } from "../utils/auth-middleware";
import withApolloClient from "../utils/with-apollo-client";
import ApolloClient from "apollo-client";

interface IAppProps extends AppProps {
  token: string;
  apolloClient: ApolloClient<unknown>;
}

class Downwrite extends App<IAppProps> {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};
    let { DW_TOKEN: token } = cookies<ICookie>(ctx) as ICookie;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, token };
  }

  public render(): JSX.Element {
    const { Component, pageProps, token, apolloClient } = this.props;
    const authed = !isEmpty(token);
    return (
      <ApolloProvider client={apolloClient}>
        <AuthProvider token={token} authed={authed}>
          <UIShell>
            <Component {...pageProps} />
          </UIShell>
        </AuthProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(Downwrite);
