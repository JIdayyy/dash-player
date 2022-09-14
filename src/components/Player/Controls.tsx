import { Button, HStack, Icon } from "@chakra-ui/react";
import usePlayer from "src/hooks/usePlayer";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePause, AiFillForward, AiFillBackward } from "react-icons/ai";
import { RefObject } from "react";

export default function Controls({
    playerRef,
}: {
    playerRef: RefObject<HTMLAudioElement>;
}): JSX.Element {
    const { play, pause, isPlaying, dispatchSetNextSong } =
        usePlayer(playerRef);

    return (
        <HStack w="full" justifyContent="center">
            <Button variant="unstyled" onClick={pause}>
                <Icon
                    _dark={{ color: "white" }}
                    _light={{ color: "black" }}
                    width={10}
                    height={10}
                    as={AiFillBackward}
                />
            </Button>
            {!isPlaying ? (
                <Button variant="unstyled" onClick={play}>
                    <Icon
                        _dark={{ color: "white" }}
                        _light={{ color: "black" }}
                        width={10}
                        height={10}
                        color="white"
                        as={BsFillPlayFill}
                    />
                </Button>
            ) : (
                <Button variant="unstyled" onClick={pause}>
                    <Icon
                        _dark={{ color: "white" }}
                        _light={{ color: "black" }}
                        width={10}
                        height={10}
                        color="white"
                        as={AiOutlinePause}
                    />
                </Button>
            )}

            <Button variant="unstyled" onClick={dispatchSetNextSong}>
                <Icon
                    _dark={{ color: "white" }}
                    _light={{ color: "black" }}
                    width={10}
                    height={10}
                    color="white"
                    as={AiFillForward}
                />
            </Button>
        </HStack>
    );
}
