import { Box, BoxProps, Flex, Icon, Text } from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import { CustomDomComponent, motion } from "framer-motion";
import usePlayer from "src/hooks/usePlayer";
import { BsSoundwave } from "react-icons/bs";

interface IProps {
    song: Song;
    handleClick: (id: string) => void;
    index: number;
}

const MotionBox: CustomDomComponent<BoxProps> = motion(Box);

const PlaylistItem = ({ song, handleClick, index }: IProps) => {
    const { selectedSong } = usePlayer();
    return (
        <MotionBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={2}
            bg={index % 2 === 0 ? "transparent" : "gray.600"}
            whileHover={{
                // backgroundColor: "#3e444f",
                textDecoration: "underline",
            }}
            cursor="pointer"
            onClick={() => handleClick(song.id)}
            color="white"
            rounded="sm"
        >
            <Text>{song.title}</Text>
            {selectedSong?.id === song.id && <Icon as={BsSoundwave} />}
        </MotionBox>
    );
};

export default function Playlist(): JSX.Element {
    const { songs, showPlaylist } = useAppSelector(
        (state) => state.rootReducer.player,
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
                    {songs.map((song, index) => (
                        <PlaylistItem
                            index={index}
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
