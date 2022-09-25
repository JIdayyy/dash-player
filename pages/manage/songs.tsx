import MainLayout from "@components/Layout/MainLayout";
import SongTable from "@components/Tables/song";
import { ReactElement, ReactNode } from "react";

const ManageSongs = (): ReactNode => {
    return <SongTable />;
};

ManageSongs.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default ManageSongs;
