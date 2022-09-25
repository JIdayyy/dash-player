import { Center, Flex, Portal, Text } from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import React, { useRef } from "react";
import usePlayer from "src/hooks/usePlayer";
import AlbumPicture from "./AlbumPicture";
import Controls from "./Controls";
import Playlist from "./Playlist";
import PlaylistToggle from "./PlaylistToggle";
import SliderSongPosition from "./SliderSongPosition";
import SongTitle from "./SongTitle";

export default function Player(): JSX.Element {
    const audioRef = useRef<HTMLAudioElement>(null);

    const selectedSong = useAppSelector(
        (state) => state.rootReducer.player.selectedSong,
    );
    const isPlaying = useAppSelector(
        (state) => state.rootReducer.player.isPlaying,
    );

    const { dispatchSetIsOnPlay, dispatchSetIsOnPause } = usePlayer(audioRef);

    return (
        <Portal>
            <Flex
                border="2px solid gray"
                shadow="md"
                overflow="hidden"
                rounded="md"
                zIndex="modal"
                _light={{ bg: "white" }}
                _dark={{ bgGradient: "linear(to-br, gray.700, gray.500)" }}
                position="fixed"
                bottom={10}
                right={10}
                direction="column"
                w="400px"
                justifyContent="center"
                alignItems="center"
            >
                {selectedSong && (
                    <audio
                        autoPlay={isPlaying}
                        onPlaying={dispatchSetIsOnPlay}
                        onPause={dispatchSetIsOnPause}
                        ref={audioRef}
                        src={selectedSong.link}
                    />
                )}
                <Playlist />
                <Flex
                    p={4}
                    justifyContent="space-between"
                    alignItems="flex-start"
                    w="full"
                >
                    <AlbumPicture />

                    <SongTitle />

                    <PlaylistToggle />
                </Flex>
                <SliderSongPosition audioRef={audioRef} />
                <Controls playerRef={audioRef} />
                <Center my={4}>
                    <Text fontSize="small" fontWeight="bold">
                        Made with ❤️ & ☕️ by Jidayyy
                    </Text>
                </Center>
            </Flex>
        </Portal>
    );
}
