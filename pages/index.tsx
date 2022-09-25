import React, { ReactElement } from "react";
import MainLayout from "@components/Layout/MainLayout";
import CardList from "@components/CardList";

const Home = (): JSX.Element => {
    return <CardList />;
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default Home;
