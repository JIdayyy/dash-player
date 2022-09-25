import { Tr, Td, Icon, Spinner, Text, useColorMode } from "@chakra-ui/react";
import EditSongForm from "@components/forms/EditSongForm";
import AlertDialogModal from "@components/Modals/AlertDialog";
import SimpleModal from "@components/Modals/SimpleModal";
import { removeSong } from "@redux/slices/player";
import { useAppDispatch } from "@redux/store";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useMutation } from "react-query";
import songFetcher from "@services/fetcher/song";
import Link from "next/link";
import { useDeleteSongMutation } from "@redux/services/songs";

type Props = {
    song: Song;
};

export default function TableItem({ song }: Props): JSX.Element {
    const dispatch = useAppDispatch();
    const { colorMode } = useColorMode();
    const { mutate, isLoading } = useMutation(
        (id: string) => songFetcher.delete(id),
        {
            onSuccess: (data) => {
                dispatch(removeSong(data.id));
            },
        },
    );
    const [deleteSong] = useDeleteSongMutation();

    return (
        <Tr
            rounded="xl"
            overflow="hidden"
            cursor="pointer"
            _hover={{
                backgroundColor:
                    colorMode === "light" ? "gray.200" : "gray.700",
            }}
        >
            <Td>
                <Text
                    noOfLines={1}
                    fontSize={["xs", "sm"]}
                    maxWidth={["100px", "200px", "200px"]}
                >
                    {song.id}
                </Text>
            </Td>
            <Td fontSize={["xs", "sm"]}>
                <Text
                    noOfLines={1}
                    fontSize={["xs", "sm"]}
                    maxWidth={["100px", "200px", "200px"]}
                >
                    {song.title}
                </Text>
            </Td>
            <Td fontSize={["xs", "sm"]}>
                <Text
                    noOfLines={1}
                    fontSize={["xs", "sm"]}
                    maxWidth={["100px", "200px", "200px"]}
                >
                    {song.artist.name}
                </Text>
            </Td>
            <Td fontSize={["xs", "sm"]}>
                <Link href={`/manage/albums`}>
                    <Text
                        _hover={{ textDecoration: "underline" }}
                        noOfLines={1}
                        fontSize={["xs", "sm"]}
                        maxWidth={["100px", "200px", "200px"]}
                    >
                        {song.album.title}
                    </Text>
                </Link>
            </Td>
            <Td display="flex" justifyContent="center" alignItems="center">
                <SimpleModal button={<Icon as={FaRegEdit} />} title="Edit song">
                    <EditSongForm song={song} />
                </SimpleModal>

                <AlertDialogModal
                    message="Delete Song"
                    trigger={() => deleteSong(song.id)}
                />
                {isLoading && <Spinner />}
            </Td>
        </Tr>
    );
}
