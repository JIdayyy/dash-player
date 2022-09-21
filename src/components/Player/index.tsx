import { Center, Flex, HStack, Portal, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import usePlayer from "src/hooks/usePlayer";
import { secondsToHms } from "src/utils/secondToHMS";
import AlbumPicture from "./AlbumPicture";
import Controls from "./Controls";
import Playlist from "./Playlist";
import PlaylistToggle from "./PlaylistToggle";
import SliderSongPosition from "./SliderSongPosition";
import SongTitle from "./SongTitle";

export default function Player(): JSX.Element {
    const audioRef = useRef<HTMLAudioElement>(null);
    const {
        selectedSong,
        duration,
        position,
        dispatchSetIsOnPlay,
        dispatchSetIsOnPause,
        isPlaying,
    } = usePlayer(audioRef);

    return (
        <Portal>
            <Flex
                border="2px solid gray"
                shadow="md"
                overflow="hidden"
                _light={{ bg: "white" }}
                _dark={{ bgGradient: "linear(to-br, gray.700, gray.500)" }}
                rounded="md"
                zIndex="modal"
                position="absolute"
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
                <HStack
                    p={4}
                    display="flex"
                    w="full"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Text>{secondsToHms(position) || "00:00"}</Text>
                    <SliderSongPosition audioRef={audioRef} />
                    <Text>
                        {duration > 0 ? secondsToHms(duration) : "00:00"}
                    </Text>
                </HStack>
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
