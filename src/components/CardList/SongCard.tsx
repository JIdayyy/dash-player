import { Flex, Text } from "@chakra-ui/react";
import { setSelectedSong } from "@redux/slices/player";
import { useAppDispatch } from "@redux/store";
import Image from "next/image";
import React from "react";

type Props = {
    song: Song;
};

export default function SongCard({ song }: Props): JSX.Element {
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(setSelectedSong(song.id));
    };

    return (
        <Flex
            cursor="pointer"
            onClick={handleClick}
            direction="column"
            w="200px"
        >
            <Flex position="relative" direction="column" w="200px" h="200px">
                <Image
                    objectFit="cover"
                    layout="fill"
                    alt="album picture"
                    src={song.album.picture || ""}
                />
            </Flex>
            <Text w="full" textAlign="center" noOfLines={2} fontSize="sm">
                {song.title}
            </Text>
            <Text w="full" textAlign="center" noOfLines={2} fontSize="sm">
                {song.artist.name}
            </Text>
        </Flex>
    );
}
