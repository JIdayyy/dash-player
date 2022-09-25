import { Button, Icon } from "@chakra-ui/react";
import { useAppSelector } from "@redux/store";
import React from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import usePlayer from "src/hooks/usePlayer";

export default function PlaylistToggle(): JSX.Element {
    const { toggleShowPlaylist } = usePlayer();
    const showPlaylist = useAppSelector(
        (state) => state.rootReducer.player.showPlaylist,
    );

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
