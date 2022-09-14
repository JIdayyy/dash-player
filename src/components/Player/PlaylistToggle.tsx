import { Button, Icon } from "@chakra-ui/react";
import React from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import usePlayer from "src/hooks/usePlayer";

export default function PlaylistToggle(): JSX.Element {
    const { toggleShowPlaylist, showPlaylist } = usePlayer();
    return (
        <>
            {showPlaylist ? (
                <Button p={0} variant="unstyled" onClick={toggleShowPlaylist}>
                    <Icon as={IoMdArrowDropdown} />
                </Button>
            ) : (
                <Button p={0} variant="unstyled" onClick={toggleShowPlaylist}>
                    <Icon as={IoMdArrowDropup} />
                </Button>
            )}
        </>
    );
}
