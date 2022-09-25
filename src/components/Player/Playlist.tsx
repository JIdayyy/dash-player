import {
    Box,
    BoxProps,
    Flex,
    Icon,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import { CustomDomComponent, motion } from "framer-motion";
import usePlayer from "src/hooks/usePlayer";
import { BsSoundwave } from "react-icons/bs";

interface IProps {
    song: Song;
    handleClick: (id: string) => void;
}

const MotionBox: CustomDomComponent<BoxProps> = motion(Box);

const PlaylistItem = ({ song, handleClick }: IProps) => {
    const selectedSong = useAppSelector(
        (state) => state.rootReducer.player.selectedSong,
    );
    const { colorMode } = useColorMode();
    return (
        <MotionBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={2}
            _odd={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
            _hover={{ textDecoration: "underline" }}
            cursor="pointer"
            onClick={() => handleClick(song.id)}
            rounded="sm"
        >
            <Text>{song.title}</Text>
            {selectedSong?.id === song.id && <Icon as={BsSoundwave} />}
        </MotionBox>
    );
};

export default function Playlist(): JSX.Element {
    const songs = useAppSelector((state) => state.rootReducer.player.songs);
    const showPlaylist = useAppSelector(
        (state) => state.rootReducer.player.showPlaylist,
    );
    const { handleSelectSong } = usePlayer();

    return (
        <>
            {showPlaylist && (
                <Flex
                    w="full"
                    overflowY="auto"
                    h="400px"
                    p={1}
                    direction="column"
                >
                    {songs.map((song) => (
                        <PlaylistItem
                            key={song.id}
                            song={song}
                            handleClick={() => handleSelectSong(song.id)}
                        />
                    ))}
                </Flex>
            )}
        </>
    );
}
