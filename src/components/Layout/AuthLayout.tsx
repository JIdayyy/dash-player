import { Box, Center, Spinner } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { authMeThunk } from "@redux/thunk/auth";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface IProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: IProps): JSX.Element {
    const { isAuth, loading } = useAppSelector(
        (state) => state.rootReducer.user,
    );
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuth) {
            router.push("/");
        }
    }, [isAuth]);

    useEffect(() => {
        dispatch(authMeThunk());
    }, []);

    // if (loading)
    //     return (
    //         <Center w="100vw" h="100vh">
    //             <Spinner />
    //         </Center>
    //     );

    return (
        <Box w="full" h="full">
            {children}
        </Box>
    );
}
