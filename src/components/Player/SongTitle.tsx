import { Text } from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import { memo } from "react";

function SongTitle(): JSX.Element {
    const selectedSong = useAppSelector(
        (state) => state.rootReducer.player.selectedSong,
    );
    return (
        <Text maxW="50%" h="full" textAlign="start" ml={2} fontSize="sm">
            {selectedSong?.title} - {selectedSong && selectedSong.artist.name}
        </Text>
    );
}

export default memo(SongTitle);
