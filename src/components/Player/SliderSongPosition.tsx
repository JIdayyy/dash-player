import {
    Flex,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from "@chakra-ui/react";
import { RefObject, useEffect } from "react";
import usePlayer from "src/hooks/usePlayer";

export default function SliderSongPosition({
    audioRef,
}: {
    audioRef: RefObject<HTMLAudioElement>;
}): JSX.Element {
    const { dispatchSongPosition, position, dispatchSetDuration, duration } =
        usePlayer();

    useEffect(() => {
        const timer = window.setInterval(() => {
            if (
                audioRef &&
                typeof audioRef.current?.currentTime !== "undefined" &&
                audioRef?.current?.currentTime > 0
            ) {
                dispatchSongPosition(audioRef?.current?.currentTime);
            }
        }, 1000);
        return function () {
            clearInterval(timer);
        };
    }, [audioRef]);

    useEffect(() => {
        dispatchSetDuration(Math.floor(audioRef.current?.duration as number));
    }, [position]);

    const handleChange = (e: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = e;
        }
    };

    return (
        <Flex w="full">
            <Slider
                onChange={handleChange}
                aria-label="slider-ex-1"
                defaultValue={30}
                size="md"
                value={position}
                max={duration}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </Flex>
    );
}
