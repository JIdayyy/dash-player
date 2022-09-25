import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import albumFetcher from "@services/fetcher/album";
import { useQuery } from "react-query";

import TableItem from "./TableItem";

interface IProps {
    albumId?: string;
}

export default function SongTable({ albumId }: IProps): JSX.Element {
    const songs = useAppSelector((state) => state.rootReducer.player.songs);

    const { data } = useQuery(
        ["getAlbumSongs", albumId],
        () => albumFetcher.getOneWithSongs(albumId as string),
        {
            enabled: !!albumId,
        },
    );

    return (
        <TableContainer mb={albumId ? 20 : 0} w="full" h="full">
            <Table size="sm" variant={albumId ? "simple" : "striped"}>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Title</Th>
                        <Th>Artist</Th>
                        <Th>Album</Th>
                        <Th></Th>
                    </Tr>
                </Thead>

                <Tbody w="full">
                    {!albumId
                        ? songs.map((song) => (
                              <TableItem key={song.id} song={song} />
                          ))
                        : data?.songs.map((song) => (
                              <TableItem key={song.id} song={song} />
                          ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
