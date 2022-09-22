import {
    useDisclosure,
    Button,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialog,
} from "@chakra-ui/react";
import { useRef } from "react";

interface IProps {
    message: string;
    trigger: () => void;
}

export default function AlertDialogModal({
    message,
    trigger,
}: IProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    const handleClick = () => {
        trigger();
        onClose();
    };

    return (
        <>
            <Button
                rounded={2}
                size="xs"
                ml={2}
                colorScheme="red"
                onClick={onOpen}
            >
                Delete
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {message}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={handleClick}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
