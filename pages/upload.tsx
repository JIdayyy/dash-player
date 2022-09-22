import MyDropzone from "@components/DropZone";
import MainLayout from "@components/Layout/MainLayout";
import { ReactNode } from "react";

export default function Upload(): JSX.Element {
    return <MyDropzone />;
}

Upload.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
