import { Flex } from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import SongItem from "./SongItem";

export default function SongList(): JSX.Element {
    const { songs } = useAppSelector((state) => state.rootReducer.player);

    return (
        <Flex w="full" h="full" direction="column" overflowY="auto">
            {songs.map((song) => (
                <SongItem song={song} />
            ))}
        </Flex>
    );
}
