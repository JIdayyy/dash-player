import { Flex, HStack, Text } from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import { RefObject, useEffect, useState } from "react";
import { secondsToHms } from "src/utils/secondToHMS";
import SongTrackSlider from "./Slider";

export default function SliderSongPosition({
    audioRef,
}: {
    audioRef: RefObject<HTMLAudioElement>;
}): JSX.Element {
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const { isPlaying } = useAppSelector((state) => state.rootReducer.player);

    useEffect(() => {
        const timer = window.setInterval(() => {
            if (audioRef && isPlaying) {
                setPosition(audioRef?.current?.currentTime || 0);
                setDuration(
                    Math.floor(audioRef.current?.duration as number) || 0,
                );
            }
        }, 1000);
        return function () {
            clearInterval(timer);
        };
    }, [audioRef, isPlaying]);

    return (
        <HStack
            p={4}
            display="flex"
            w="full"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Text>{secondsToHms(position) || "00:00"}</Text>
            <Flex w="full">
                <SongTrackSlider
                    position={position}
                    duration={duration}
                    audioRef={audioRef}
                />
            </Flex>
            <Text>{duration > 0 ? secondsToHms(duration) : "00:00"}</Text>
        </HStack>
    );
}
