import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { getAllAlbumsWithSongCountAndArtistThunk } from "@redux/thunk/manage";
import { useEffect } from "react";
import TableItem from "./TableItem";

export default function AlbumTable(): JSX.Element {
    const { albums } = useAppSelector((state) => state.rootReducer.manage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllAlbumsWithSongCountAndArtistThunk());
    }, []);

    return (
        <TableContainer w="full" h="full">
            <Table size="sm" variant="striped">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Title</Th>
                        <Th>Artist</Th>
                        <Th>Songs</Th>
                    </Tr>
                </Thead>

                <Tbody w="full">
                    {albums.map((song) => (
                        <TableItem key={song.id} album={song} />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
