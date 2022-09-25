/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import "nprogress/nprogress.css";
import { ReactElement, ReactNode, useEffect } from "react";
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
import { NextPage } from "next";
import Router from "next/router";
import NProgress from "nprogress";

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
    getLayout?: (page: ReactElement) => ReactNode;
} & AppProps<any>;

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const apolloClient = initializeApollo();
    const queryClient = new QueryClient();

    const getLayout = Component.getLayout || ((page) => page);

    useEffect(() => {
        const handleRouteStart = () => NProgress.start();
        const handleRouteDone = () => NProgress.done();

        Router.events.on("routeChangeStart", handleRouteStart);
        Router.events.on("routeChangeComplete", handleRouteDone);
        Router.events.on("routeChangeError", handleRouteDone);

        return () => {
            // Make sure to remove the event handler on unmount!
            Router.events.off("routeChangeStart", handleRouteStart);
            Router.events.off("routeChangeComplete", handleRouteDone);
            Router.events.off("routeChangeError", handleRouteDone);
        };
    }, []);

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
