import { Flex } from "@chakra-ui/react";
import MainLayout from "@components/Layout/MainLayout";
import SongTable from "@components/Tables/song";
import { NextPageWithLayout } from "./_app";

export default function Manage(): JSX.Element {
    return (
        <Flex w="full" h="full">
            <SongTable />
        </Flex>
    );
}

Manage.getLayout = (page: NextPageWithLayout) => {
    return <MainLayout>{page}</MainLayout>;
};
