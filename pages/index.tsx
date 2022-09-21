import React, { ReactElement } from "react";
import MainLayout from "@components/Layout/MainLayout";
import type { NextPageWithLayout } from "./_app";
import { Text } from "@chakra-ui/react";
import Player from "@components/Player";

const Home: NextPageWithLayout = () => {
    return (
        <Text>
            <Player />
        </Text>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default Home;
