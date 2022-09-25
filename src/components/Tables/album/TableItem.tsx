import {
    Tr,
    Td,
    Icon,
    Spinner,
    Text,
    useDisclosure,
    Button,
    useColorMode,
} from "@chakra-ui/react";
import AlertDialogModal from "@components/Modals/AlertDialog";
import SimpleModal from "@components/Modals/SimpleModal";
import { removeAlbum } from "@redux/slices/manage";
import { useAppDispatch } from "@redux/store";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import albumFetcher from "@services/fetcher/album";
import EditAlbum from "@components/forms/EditAlbumForm";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import SongTable from "../song";

type Props = {
    album: Album;
};

export default function TableItem({ album }: Props): JSX.Element {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const dispatch = useAppDispatch();
    const { colorMode } = useColorMode();
    const client = useQueryClient();
    const { mutate, isLoading } = useMutation(
        (id: string) => albumFetcher.delete(id),
        {
            onSuccess: (data) => {
                dispatch(removeAlbum(data.id));
                client.refetchQueries(["getAlbumSongs", album.id]);
            },
        },
    );

    return (
        <>
            <Modal isCentered size="4xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SongTable albumId={album.id} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Tr
                rounded="xl"
                overflow="hidden"
                cursor="pointer"
                _hover={{
                    backgroundColor:
                        colorMode === "light" ? "gray.200" : "gray.700",
                }}
            >
                <Td onClick={onOpen}>
                    <Text
                        noOfLines={1}
                        fontSize={["xs", "sm"]}
                        maxWidth={["100px", "200px", "full"]}
                    >
                        {album.id}
                    </Text>
                </Td>
                <Td onClick={onOpen} fontSize={["xs", "sm"]}>
                    {album.title}
                </Td>
                <Td onClick={onOpen} fontSize={["xs", "sm"]}>
                    {album.artist.name}
                </Td>
                <Td onClick={onOpen} fontSize={["xs", "sm"]}>
                    {album._count?.songs}
                </Td>
                <Td display="flex" justifyContent="center" alignItems="center">
                    <SimpleModal
                        button={<Icon as={FaRegEdit} />}
                        title="Edit album"
                    >
                        <EditAlbum album={album} />
                    </SimpleModal>

                    <AlertDialogModal
                        message="Delete album"
                        trigger={() => mutate(album.id)}
                    />
                    {isLoading && <Spinner />}
                </Td>
            </Tr>
        </>
    );
}
