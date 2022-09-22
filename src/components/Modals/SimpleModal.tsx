import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";

interface IProps {
    title: string;
    button: JSX.Element;
    children: JSX.Element;
}

function SimpleModal({ title, button, children }: IProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button size="xs" rounded={2} onClick={onOpen}>
                {button}
            </Button>
            <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody w="full" display="flex" flexDirection="column">
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default SimpleModal;
