import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { useGetAllAlbumsQuery } from "@redux/services/songs";
import TableItem from "./TableItem";

export default function AlbumTable(): JSX.Element {
    const { data: albums = [], isLoading } = useGetAllAlbumsQuery({
        artist: true,
        count: "songs",
    });

    console.log("albums", isLoading);

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
