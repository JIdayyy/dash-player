import MainLayout from "@components/Layout/MainLayout";
import AlbumTable from "@components/Tables/album";
import { ReactElement, ReactNode } from "react";

const ManageAlbums = (): ReactNode => {
    return <AlbumTable />;
};

ManageAlbums.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default ManageAlbums;
