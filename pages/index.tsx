import React, { ReactElement } from "react";
import MainLayout from "@components/Layout/MainLayout";
import AudioContextProvider from "src/context/audioContext";
import CardList from "@components/CardList";

const Home = (): JSX.Element => {
    return (
        <AudioContextProvider>
            <CardList />
        </AudioContextProvider>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default Home;
