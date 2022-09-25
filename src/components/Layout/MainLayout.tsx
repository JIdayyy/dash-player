import {
    useDisclosure,
    Flex,
    Box,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    IconButton,
    Center,
    Text,
} from "@chakra-ui/react";
import React, { ReactNode, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { useRouter } from "next/router";
import socket from "@services/socket";
import BreadScrumbs from "@components/breadscrumbs";
import { useAppSelector } from "@redux/store";
import Sidebar from "./Sidebar";
import Player from "@components/Player";
import AudioContextProvider from "src/context/audioContext";

interface IProps {
    children: ReactNode;
}

export default function MainLayout({ children }: IProps): JSX.Element {
    const sidebar = useDisclosure();
    const isAuth = useAppSelector((state) => state.rootReducer.user.isAuth);
    const router = useRouter();

    useEffect(() => {
        return () => {
            socket.off("NEW_SONG");
        };
    }, []);

    useEffect(() => {
        if (!isAuth) {
            router.push("/auth/signin");
        }
    }, [isAuth]);

    if (!isAuth)
        return (
            <Center w="full" h="full">
                <Text>Unauthenticated</Text>
            </Center>
        );

    return (
        <Box as="section" h="100vh" w="100vw">
            <Sidebar
                display={{
                    base: "none",
                    md: "unset",
                }}
            />
            <Drawer
                isOpen={sidebar.isOpen}
                onClose={sidebar.onClose}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <Sidebar w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box
                ml={{
                    base: 0,
                    md: 60,
                }}
                transition=".3s ease"
                flex={1}
            >
                <Flex
                    as="header"
                    align="center"
                    justify="space-between"
                    w="full"
                    px="4"
                    bg="white"
                    _dark={{
                        bg: "gray.800",
                    }}
                    borderBottomWidth="1px"
                    color="inherit"
                    h="14"
                >
                    <IconButton
                        aria-label="Menu"
                        display={{
                            base: "inline-flex",
                            md: "none",
                        }}
                        onClick={sidebar.onOpen}
                        icon={<FiMenu />}
                        size="sm"
                    />

                    <BreadScrumbs />
                </Flex>

                <Flex
                    h="full"
                    overflowX="hidden"
                    overflowY="scroll"
                    w="full"
                    flexGrow={1}
                    as="main"
                    p="4"
                >
                    {children}
                    <AudioContextProvider>
                        <Player />
                    </AudioContextProvider>
                </Flex>
            </Box>
        </Box>
    );
}
