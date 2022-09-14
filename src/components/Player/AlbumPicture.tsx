import { Box, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { HiMusicNote } from "react-icons/hi";
import usePlayer from "src/hooks/usePlayer";

export default function AlbumPicture(): JSX.Element {
    const { selectedSong } = usePlayer();
    return (
        <>
            {selectedSong && selectedSong.album.picture ? (
                <Box
                    width="100px"
                    height="100px"
                    overflow="hidden"
                    rounded="md"
                    position="relative"
                >
                    <Image
                        objectFit="cover"
                        layout="fill"
                        src={selectedSong.album.picture}
                    />
                </Box>
            ) : (
                <Icon width="100px" height="100px" as={HiMusicNote} />
            )}
        </>
    );
}
