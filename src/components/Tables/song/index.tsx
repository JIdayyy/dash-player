import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";

import TableItem from "./TableItem";

export default function SongTable(): JSX.Element {
    const { songs } = useAppSelector((state) => state.rootReducer.player);

    return (
        <TableContainer w="full" h="full">
            <Table size="sm" variant="striped">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Title</Th>
                        <Th></Th>
                    </Tr>
                </Thead>

                <Tbody w="full">
                    {songs.map((song) => (
                        <TableItem key={song.id} song={song} />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
