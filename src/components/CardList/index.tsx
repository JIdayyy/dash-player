import { Wrap } from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import SongCard from "./SongCard";

export default function CardList(): JSX.Element {
    const songs = useAppSelector((state) => state.rootReducer.player.songs);

    return (
        <Wrap w="full" h="full">
            {songs.map((song) => (
                <SongCard key={song.id} song={song} />
            ))}
        </Wrap>
    );
}
