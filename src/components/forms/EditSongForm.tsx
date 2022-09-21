import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import { useAppDispatch } from "@redux/store";
import getAllSongs from "@redux/thunk/songs";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import songFetcher from "src/utils/fetcher/song";

export default function EditSongForm({ song }: { song: Song }): JSX.Element {
    const { register, handleSubmit, setValue } = useForm();
    const dispatch = useAppDispatch();
    const { mutateAsync } = useMutation(
        (data: Song) => songFetcher.update(song.id, data),
        {
            onSuccess() {
                dispatch(getAllSongs());
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
            <VStack w="full">
                <Input {...register("title")} />
                <Input {...register("link")} />
                <Input {...register("duration")} />
                <Button onClick={handleSubmit(onSubmit)}>Confirm edit</Button>
            </VStack>
        </Flex>
    );
}
