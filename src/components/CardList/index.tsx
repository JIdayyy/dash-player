import { Button, Wrap } from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import { useState } from "react";
import SongCard from "./SongCard";

export default function CardList(): JSX.Element {
    const songs = useAppSelector((state) => state.rootReducer.player.songs);
    const [count, setCount] = useState(0);

    return (
        <Wrap w="full" h="full">
            {songs.map((song) => (
                <SongCard key={song.id} song={song} />
            ))}
            {count}
            <Button onClick={() => setCount((c) => c + 1)}>INCREMENT</Button>
        </Wrap>
    );
}
