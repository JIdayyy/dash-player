import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Icon,
} from "@chakra-ui/react";
import EditSongForm from "@components/forms/EditSongForm";
import SimpleModal from "@components/Modals/SimpleModal";
import { useAppSelector } from "@redux/store";
import { FaRegEdit } from "react-icons/fa";

export default function SongTable(): JSX.Element {
    const { songs } = useAppSelector((state) => state.rootReducer.player);

    return (
        <TableContainer w="full" h="full">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Title</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {songs.map((song) => (
                        <Tr
                            rounded="xl"
                            overflow="hidden"
                            cursor="pointer"
                            _hover={{
                                backgroundColor: "#3e4756",
                            }}
                        >
                            <Td>{song.id}</Td>
                            <Td>{song.title}</Td>
                            <Td>
                                <SimpleModal
                                    button={<Icon as={FaRegEdit} />}
                                    title="Edit song"
                                >
                                    <EditSongForm song={song} />
                                </SimpleModal>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
