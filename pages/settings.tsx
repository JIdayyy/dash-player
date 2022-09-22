import { Flex, HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import MainLayout from "@components/Layout/MainLayout";
import { ReactNode } from "react";

export default function Settings(): JSX.Element {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
        <Flex w="full" h="full">
            <HStack spacing={2}>
                <Text>Dark Mode</Text>{" "}
                <Switch
                    isChecked={colorMode === "dark"}
                    onChange={toggleColorMode}
                />
            </HStack>
        </Flex>
    );
}

Settings.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
