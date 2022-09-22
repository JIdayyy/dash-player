import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    useBreakpointValue,
    IconProps,
    Icon,
    useToast,
} from "@chakra-ui/react";
import AuthLayout from "@components/Layout/AuthLayout";
import { useAppDispatch } from "@redux/store";
import { signUpThunk } from "@redux/thunk/auth";
import { ReactNode } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function SignUp(): JSX.Element {
    const dispatch = useAppDispatch();
    const { handleSubmit, register } = useForm();
    const toast = useToast();

    const onSubmit = (data: FieldValues) => {
        if (data.password !== data.passwordConfirmation) {
            return toast({
                title: "Error",
                description: "Passwords do not match",
            });
        }
        dispatch(
            signUpThunk({
                email: data.email,
                password: data.password,
                username: data.username,
            }),
        );
    };

    return (
        <Box position={"relative"} w="full" h="full">
            <Container
                as={SimpleGrid}
                maxW={"7xl"}
                h="full"
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}
            >
                <Stack spacing={{ base: 10, md: 20 }}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{
                            base: "3xl",
                            sm: "4xl",
                            md: "5xl",
                            lg: "6xl",
                        }}
                    >
                        Wildify Dashboard
                    </Heading>
                </Stack>
                <Stack
                    bg={"gray.50"}
                    rounded={"xl"}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: "lg" }}
                >
                    <Stack spacing={4}>
                        <Heading
                            color={"gray.800"}
                            lineHeight={1.1}
                            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                        >
                            Sign up here
                            <Text
                                as={"span"}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text"
                            >
                                !
                            </Text>
                        </Heading>
                        <Text
                            color={"gray.500"}
                            fontSize={{ base: "sm", sm: "md" }}
                        >
                            if you don't have your secret key yet, please
                            contact an administrator
                        </Text>
                    </Stack>
                    <Box as={"form"} mt={10}>
                        <Stack spacing={4}>
                            <Input
                                {...register("username")}
                                placeholder="Username"
                                bg={"gray.100"}
                                border={0}
                                color={"gray.500"}
                                _placeholder={{
                                    color: "gray.500",
                                }}
                            />
                            <Input
                                placeholder="john@doe.io"
                                bg={"gray.100"}
                                {...register("email")}
                                border={0}
                                color={"gray.500"}
                                _placeholder={{
                                    color: "gray.500",
                                }}
                            />
                            <Input
                                placeholder="Password"
                                bg={"gray.100"}
                                {...register("password")}
                                border={0}
                                color={"gray.500"}
                                _placeholder={{
                                    color: "gray.500",
                                }}
                            />
                            <Input
                                placeholder="Password confirmation"
                                bg={"gray.100"}
                                {...register("passwordConfirmation")}
                                border={0}
                                color={"gray.500"}
                                _placeholder={{
                                    color: "gray.500",
                                }}
                            />
                        </Stack>
                        <Button
                            fontFamily={"heading"}
                            onClick={handleSubmit(onSubmit)}
                            mt={8}
                            w={"full"}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            color={"white"}
                            _hover={{
                                bgGradient: "linear(to-r, red.400,pink.400)",
                                boxShadow: "xl",
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    form
                </Stack>
            </Container>
            <Blur
                position={"absolute"}
                top={-10}
                left={-10}
                style={{ filter: "blur(70px)" }}
            />
        </Box>
    );
}

export const Blur = (props: IconProps): JSX.Element => {
    return (
        <Icon
            width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
            zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="71" cy="61" r="111" fill="#F56565" />
            <circle cx="244" cy="106" r="139" fill="#ED64A6" />
            <circle cy="291" r="139" fill="#ED64A6" />
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
        </Icon>
    );
};

SignUp.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
