import {
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Slider,
} from "@chakra-ui/react";
import { setSongPosition } from "@redux/slices/player";
import { useAppDispatch } from "@redux/store";

export default function SongTrackSlider({
    position,
    duration,
    audioRef,
}): JSX.Element {
    const dispatch = useAppDispatch();
    const handleChange = (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = e;
        }
    };

    return (
        <Slider
            step={5}
            onChange={handleChange}
            size="md"
            value={position}
            max={duration}
        >
            <SliderTrack onChange={handleChange}>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
    );
}
