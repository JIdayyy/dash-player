import { Text } from "@chakra-ui/react";
import { memo } from "react";
import usePlayer from "src/hooks/usePlayer";

function SongTitle(): JSX.Element {
    const { selectedSong } = usePlayer();
    console.log("render");
    return (
        <Text maxW="50%" h="full" textAlign="start" ml={2} fontSize="sm">
            {selectedSong?.title} - {selectedSong && selectedSong.artist.name}
        </Text>
    );
}

export default memo(SongTitle);
