import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from "@chakra-ui/react";
import { useAppDispatch } from "@redux/store";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import albumFetcher from "@services/fetcher/album";
import PictureUpload from "@components/DropZone/Picture";
import Image from "next/image";
import {
    useLazyGetAllSongsQuery,
    useUpdateAlbumMutation,
} from "@redux/services/songs";

export default function EditAlbum({ album }: { album: Album }): JSX.Element {
    const [getAllSongs] = useLazyGetAllSongsQuery();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [mutate] = useUpdateAlbumMutation();
    const { mutateAsync } = useMutation(
        (data: Partial<Album>) => albumFetcher.update(album.id, data),
        {
            onSuccess(data) {
                getAllSongs();
                // mutate();
            },
        },
    );

    useEffect(() => {
        setValue("title", album.title);
        setValue("picture", album.picture);

        () => {
            setValue("title", "");
            setValue("picture", "");
        };
    }, [album]);

    const onSubmit = (data: FieldValues) => {
        mutateAsync({
            id: album.id,
            title: data.title,
            picture: data.picture,
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
