/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { initializeApollo } from "@services/graphql";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import store from "@redux/store";
import getAllSongs from "@redux/thunk/songs";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
    getLayout?: (page: ReactElement) => ReactNode;
} & AppProps<P>;

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const apolloClient = initializeApollo();
    const queryClient = new QueryClient();

    store.dispatch(getAllSongs());
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <ChakraProvider theme={theme}>
            <ApolloProvider client={apolloClient}>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Provider store={store}>
                            {getLayout(<Component {...pageProps} />)}
                        </Provider>
                    </Hydrate>
                </QueryClientProvider>
            </ApolloProvider>
        </ChakraProvider>
    );
}

export default MyApp;
