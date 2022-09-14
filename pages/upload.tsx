import MyDropzone from "@components/DropZone";
import MainLayout from "@components/Layout/MainLayout";
import { NextPageWithLayout } from "./_app";

export default function Upload(): JSX.Element {
    return <MyDropzone />;
}

Upload.getLayout = (page: NextPageWithLayout) => {
    return <MainLayout>{page}</MainLayout>;
};
