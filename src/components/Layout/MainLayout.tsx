import {
    useDisclosure,
    useColorModeValue,
    Flex,
    Icon,
    Box,
    Collapse,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    IconButton,
    Avatar,
    Text,
    Switch,
    useColorMode,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Logo } from "..";
import {
    MdHome,
    MdKeyboardArrowRight,
    MdOutlineCloudUpload,
} from "react-icons/md";
import { HiCode } from "react-icons/hi";
import { BsGearFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import Player from "@components/Player";
import { useRouter } from "next/router";

interface IProps {
    children: ReactNode;
}

export default function MainLayout({ children }: IProps): JSX.Element {
    const sidebar = useDisclosure();
    const integrations = useDisclosure();
    const color = useColorModeValue("gray.600", "gray.300");
    const { toggleColorMode } = useColorMode();

    const NavItem = ({ icon, children, href }) => {
        const router = useRouter();

        const handleClick = () => router.push(`/${href}`);

        return (
            <Flex
                onClick={handleClick}
                align="center"
                px="4"
                pl="4"
                py="3"
                cursor="pointer"
                color="inherit"
                _dark={{
                    color: "gray.400",
                }}
                _hover={{
                    bg: "gray.100",
                    _dark: {
                        bg: "gray.900",
                    },
                    color: "gray.900",
                }}
                role="group"
                fontWeight="semibold"
                transition=".15s ease"
            >
                {icon && (
                    <Icon
                        mx="2"
                        boxSize="4"
                        _groupHover={{
                            color: color,
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        );
    };

    const SidebarContent = (props) => (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg="white"
            _dark={{
                bg: "gray.800",
            }}
            border
            color="inherit"
            borderRightWidth="1px"
            w="60"
            {...props}
        >
            <Flex px="4" py="5" align="center">
                <Text
                    fontSize="2xl"
                    ml="2"
                    color="brand.500"
                    _dark={{
                        color: "white",
                    }}
                    fontWeight="semibold"
                >
                    Jidayyy Dashboard
                </Text>
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="gray.600"
                aria-label="Main Navigation"
            >
                <NavItem href="" icon={MdHome}>
                    Home
                </NavItem>

                <NavItem href="upload" icon={MdOutlineCloudUpload}>
                    Upload
                </NavItem>

                {/* <NavItem icon={HiCode} onClick={integrations.onToggle}>
                    Integrations
                    <Icon
                        as={MdKeyboardArrowRight}
                        ml="auto"
                        transform={integrations.isOpen ? "rotate(90deg)" : ""}
                    />
                </NavItem> */}
                {/* <Collapse in={integrations.isOpen}>
                    <NavItem pl="12" py="2">
                        Shopify
                    </NavItem>
                    <NavItem pl="12" py="2">
                        Slack
                    </NavItem>
                    <NavItem pl="12" py="2">
                        Zapier
                    </NavItem>
                    <NavItem pl="12" py="2">
                        Upload
                    </NavItem>
                </Collapse> */}
                <NavItem href="/settings" icon={BsGearFill}>
                    Settings
                </NavItem>
            </Flex>
        </Box>
    );

    return (
        <Box
            as="section"
            bg="gray.50"
            _dark={{
                bg: "gray.700",
            }}
            minH="100vh"
            w="full"
        >
            <SidebarContent
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
                    <SidebarContent w="full" borderRight="none" />
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
                    {/* <InputGroup
                        w="96"
                        display={{
                            base: "none",
                            md: "flex",
                        }}
                    >
                        <InputLeftElement color="gray.500">
                            <FiSearch />
                        </InputLeftElement>
                        <Input placeholder="Search for articles..." />
                    </InputGroup> */}
                </Flex>

                <Flex w="full" flexGrow={1} as="main" p="4">
                    {children}
                </Flex>
                <Player />
            </Box>
        </Box>
    );
}
