import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from "@chakra-ui/react";
import { updateSong } from "@redux/slices/player";
import { useAppDispatch } from "@redux/store";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import songFetcher from "@services/fetcher/song";

export default function EditSongForm({ song }: { song: Song }): JSX.Element {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const dispatch = useAppDispatch();
    const { mutateAsync } = useMutation(
        (data: Partial<Song>) => songFetcher.update(song.id, data),
        {
            onSuccess(data) {
                dispatch(updateSong(data));
            },
        },
    );

    useEffect(() => {
        setValue("title", song.title);
        setValue("link", song.link);
        setValue("duration", song.duration);

        () => {
            setValue("title", "");
            setValue("link", "");
            setValue("duration", "");
        };
    }, []);

    const onSubmit = (data: FieldValues) => {
        mutateAsync({
            id: song.id,
            title: data.title,
            duration: song.duration,
            link: data.link,
        });
    };

    return (
        <Flex w="full" h="full">
            <VStack w="full" spacing={2}>
                <FormControl isInvalid={!!errors.title}>
                    <FormLabel>Title</FormLabel>
                    <Input {...register("title", { required: true })} />
                </FormControl>
                <FormControl isInvalid={!!errors.link}>
                    <FormLabel>Link</FormLabel>
                    <Input {...register("link", { required: true })} />
                </FormControl>
                <FormControl isInvalid={!!errors.duration}>
                    <FormLabel>Duration</FormLabel>
                    <Input {...register("duration", { required: true })} />
                </FormControl>
                <Flex w="full" justifyContent="flex-end">
                    <Button onClick={handleSubmit(onSubmit)}>
                        Confirm edit
                    </Button>
                </Flex>
            </VStack>
        </Flex>
    );
}
