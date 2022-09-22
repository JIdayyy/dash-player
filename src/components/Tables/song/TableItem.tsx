import { Tr, Td, Icon, Spinner } from "@chakra-ui/react";
import EditSongForm from "@components/forms/EditSongForm";
import AlertDialogModal from "@components/Modals/AlertDialog";
import SimpleModal from "@components/Modals/SimpleModal";
import { removeSong } from "@redux/slices/player";
import { useAppDispatch } from "@redux/store";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useMutation } from "react-query";
import songFetcher from "src/utils/fetcher/song";

type Props = {
    song: Song;
};

export default function TableItem({ song }: Props): JSX.Element {
    const dispatch = useAppDispatch();

    const { mutate, isLoading } = useMutation(
        (id: string) => songFetcher.delete(id),
        {
            onSuccess: (data) => {
                dispatch(removeSong(data.id));
            },
        },
    );

    return (
        <Tr
            rounded="xl"
            overflow="hidden"
            cursor="pointer"
            _hover={{
                backgroundColor: "#3e4756",
            }}
        >
            <Td fontSize={["xs", "sm"]} maxWidth={["100px", "200px"]}>
                {song.id}
            </Td>
            <Td fontSize={["xs", "sm"]}>{song.title}</Td>
            <Td display="flex" justifyContent="center" alignItems="center">
                <SimpleModal button={<Icon as={FaRegEdit} />} title="Edit song">
                    <EditSongForm song={song} />
                </SimpleModal>

                <AlertDialogModal
                    message="Delete Song"
                    trigger={() => mutate(song.id)}
                />
                {isLoading && <Spinner />}
            </Td>
        </Tr>
    );
}
