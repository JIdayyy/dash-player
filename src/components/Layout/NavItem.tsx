import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface IProps {
    isChild?: boolean;
    onClick?: () => void;
    icon: IconType;
    children: ReactNode;
    href?: string;
}

const NavItem = ({
    isChild = false,
    onClick,
    icon,
    children,
    href = "",
}: IProps): JSX.Element => {
    const router = useRouter();
    const color = useColorModeValue("gray.600", "gray.300");

    const handleClick = () => router.push(`/${href}`);

    return (
        <Flex
            onClick={onClick || handleClick}
            align="center"
            px="4"
            pl={isChild ? "12" : "4"}
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
                        color,
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};

export default NavItem;
