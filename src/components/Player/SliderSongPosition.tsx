import {
    Flex,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import { RefObject, useEffect } from "react";
import usePlayer from "src/hooks/usePlayer";
import SongTrackSlider from "./Slider";

export default function SliderSongPosition({
    audioRef,
}: {
    audioRef: RefObject<HTMLAudioElement>;
}): JSX.Element {
    const { dispatchSongPosition, dispatchSetDuration } = usePlayer(audioRef);
    const position = useAppSelector(
        (state) => state.rootReducer.player.position,
    );
    const duration = useAppSelector(
        (state) => state.rootReducer.player.duration,
    );
    const { isPlaying } = useAppSelector((state) => state.rootReducer.player);

    useEffect(() => {
        const timer = window.setInterval(() => {
            if (audioRef && isPlaying) {
                dispatchSongPosition(audioRef?.current?.currentTime || 0);
                dispatchSetDuration(
                    Math.floor(audioRef.current?.duration as number) || 0,
                );
            }
        }, 1000);
        return function () {
            clearInterval(timer);
        };
    }, [audioRef, isPlaying]);

    useEffect(() => {
        dispatchSetDuration(
            Math.floor(audioRef.current?.duration as number) || 0,
        );
        dispatchSongPosition(Math.floor(audioRef?.current?.currentTime) || 0);
    }, []);

    return (
        <Flex w="full">
            <SongTrackSlider
                position={position}
                duration={duration}
                audioRef={audioRef}
            />
        </Flex>
    );
}
