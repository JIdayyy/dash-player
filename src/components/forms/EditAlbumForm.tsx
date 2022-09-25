import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import PictureUpload from "@components/DropZone/Picture";
import Image from "next/image";
import { useUpdateAlbumMutation } from "@redux/services/songs";

export default function EditAlbum({ album }: { album: Album }): JSX.Element {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [updateAlbum] = useUpdateAlbumMutation();

    useEffect(() => {
        setValue("title", album.title);
        setValue("picture", album.picture);

        () => {
            setValue("title", "");
            setValue("picture", "");
        };
    }, [album]);

    const onSubmit = (data: FieldValues) => {
        updateAlbum({
            id: album.id,
            title: data.title,
            picture: data.picture,
            artistId: album.artistId,
        });
    };

    return (
        <Flex direction="column" w="full" h="full">
            <Box position="relative" width="80px" height="80px">
                <Image
                    src={album.picture || ""}
                    layout="fill"
                    objectFit="cover"
                />
            </Box>
            <VStack my={5} w="full">
                <FormControl isInvalid={!!errors.title}>
                    <FormLabel>Title</FormLabel>
                    <Input {...register("title", { required: true })} />
                </FormControl>
                <FormControl isInvalid={!!errors.picture}>
                    <FormLabel>Picture</FormLabel>
                    <Input {...register("picture")} />
                </FormControl>
                <Flex w="full" justifyContent="flex-end">
                    <Button onClick={handleSubmit(onSubmit)}>
                        Confirm edit
                    </Button>
                </Flex>
            </VStack>
            <PictureUpload albumId={album.id} />
        </Flex>
    );
}
