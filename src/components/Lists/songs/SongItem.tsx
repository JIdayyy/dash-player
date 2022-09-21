import { Flex } from "@chakra-ui/react";

interface IProps {
    song: Song;
}

export default function SongItem({ song }: IProps): JSX.Element {
    return <Flex>{song.title}</Flex>;
}
