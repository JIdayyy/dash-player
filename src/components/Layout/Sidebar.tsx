import {
    Box,
    Flex,
    Icon,
    Collapse,
    Text,
    useDisclosure,
    BoxProps,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";
import { GiSoundWaves } from "react-icons/gi";
import { MdAlbum } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import {
    MdHome,
    MdOutlineCloudUpload,
    MdManageSearch,
    MdKeyboardArrowRight,
} from "react-icons/md";
import NavItem from "./NavItem";
import { signOutThunk } from "@redux/thunk/auth";
import { useAppDispatch } from "@redux/store";
import Link from "next/link";

export default function SideBar(props: BoxProps): JSX.Element {
    const dispatch = useAppDispatch();
    const integrations = useDisclosure();

    return (
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
                    Wildify Dashboard
                </Text>
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="gray.600"
                aria-label="Main Navigation"
            >
                <NavItem href="/" icon={MdHome}>
                    Home
                </NavItem>

                <NavItem href="/upload" icon={MdOutlineCloudUpload}>
                    Upload
                </NavItem>

                <NavItem icon={MdManageSearch} onClick={integrations.onToggle}>
                    Manage
                    <Icon
                        as={MdKeyboardArrowRight}
                        ml="auto"
                        transform={integrations.isOpen ? "rotate(90deg)" : ""}
                    />
                </NavItem>
                <Collapse in={integrations.isOpen}>
                    <NavItem isChild href="/manage/songs" icon={GiSoundWaves}>
                        Songs
                    </NavItem>
                    <NavItem isChild href="/manage/albums" icon={MdAlbum}>
                        Albums
                    </NavItem>
                </Collapse>
                <NavItem href="/settings" icon={BsGearFill}>
                    Settings
                </NavItem>
                <NavItem
                    onClick={() => dispatch(signOutThunk())}
                    icon={BiLogOut}
                >
                    Sign out
                </NavItem>
            </Flex>
        </Box>
    );
}
