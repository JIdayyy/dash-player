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
import {
    MdHome,
    MdOutlineCloudUpload,
    MdManageSearch,
    MdKeyboardArrowRight,
} from "react-icons/md";
import NavItem from "./NavItem";

export default function SideBar(props: BoxProps): JSX.Element {
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
                <NavItem href="" icon={MdHome}>
                    Home
                </NavItem>

                <NavItem href="upload" icon={MdOutlineCloudUpload}>
                    Upload
                </NavItem>

                <NavItem icon={MdManageSearch} onClick={integrations.onToggle}>
                    Integrations
                    <Icon
                        as={MdKeyboardArrowRight}
                        ml="auto"
                        transform={integrations.isOpen ? "rotate(90deg)" : ""}
                    />
                </NavItem>
                <Collapse in={integrations.isOpen}>
                    <NavItem isChild href="manage" icon={GiSoundWaves}>
                        Songs
                    </NavItem>
                </Collapse>
                <NavItem href="settings" icon={BsGearFill}>
                    Settings
                </NavItem>
            </Flex>
        </Box>
    );
}
