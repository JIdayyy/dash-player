/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useToast, Flex, Icon, Progress, Button } from "@chakra-ui/react";
import { updateAlbum } from "@redux/slices/manage";
import { useAppDispatch } from "@redux/store";
import getAllSongs from "@redux/thunk/songs";
import axios, { CancelTokenSource } from "axios";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineCloudUpload } from "react-icons/md";
import axiosInstance from "src/utils/axiosInstance";

interface IProps {
    albumId: string;
}

export default function PictureUpload({ albumId }: IProps): JSX.Element {
    const [progress, setProgress] = useState(0);
    const [canceler, setCanceler] = useState<{
        source: CancelTokenSource | null;
    }>({
        source: null,
    });
    const toast = useToast();
    const dispatch = useAppDispatch();

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const source = axios.CancelToken.source();
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        try {
            const result = await axiosInstance.post(
                `/albums/${albumId}/picture`,
                formData,
                {
                    cancelToken: source.token,
                    onUploadProgress: (p) => {
                        if (!canceler.source) {
                            setCanceler({ source });
                        }
                        setProgress((p.loaded / p.total) * 100);
                    },
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                },
            );

            if (result) {
                toast({
                    title: "Upload successull",
                    description: "Upload successfull",
                    status: "success",
                });
                dispatch(updateAlbum(result.data));
                dispatch(getAllSongs());
                setProgress(0);
            }
        } catch (thrown) {
            if (axios.isCancel(thrown) && axios.isAxiosError(thrown)) {
                setProgress(0);
            } else if (
                axios.isAxiosError(thrown) &&
                typeof thrown !== "undefined"
            ) {
                setProgress(0);
                toast({
                    title: "Error",
                    description: thrown.response!.data.message,
                    status: "warning",
                });
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <Flex direction="column" w="full">
            <Flex
                cursor="pointer"
                direction="column"
                w="full"
                h="200px"
                border="2px dotted gray"
                rounded="md"
                justifyContent="center"
                alignItems="center"
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
                <Icon
                    color="gray.500"
                    my={5}
                    width={100}
                    height={100}
                    as={MdOutlineCloudUpload}
                />
            </Flex>
            <Progress
                borderRadius={100}
                my={5}
                size="md"
                colorScheme="green"
                hasStripe
                value={progress}
                max={100}
            />
            {progress > 0 && (
                <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => {
                        if (canceler.source) {
                            canceler.source.cancel();
                            setProgress(0);
                            toast({
                                description: "Cancelled",
                                status: "warning",
                                title: "Request canceled",
                            });
                            setCanceler({ source: null });
                        }
                    }}
                >
                    CANCEL
                </Button>
            )}
        </Flex>
    );
}
