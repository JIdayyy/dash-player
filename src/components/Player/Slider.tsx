import {
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Slider,
} from "@chakra-ui/react";

interface IProps {
    position: number;
    duration: number;
    audioRef: React.RefObject<HTMLAudioElement>;
}

export default function SongTrackSlider({
    position,
    duration,
    audioRef,
}: IProps): JSX.Element {
    const handleChange = (e: number) => {
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
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
    );
}
