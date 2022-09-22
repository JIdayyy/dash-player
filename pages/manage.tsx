import MainLayout from "@components/Layout/MainLayout";
import SongTable from "@components/Tables/song";
import { ReactElement, ReactNode } from "react";

const Manage = (): ReactNode => {
    return <SongTable />;
};

Manage.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default Manage;
