/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Flex, Icon, Progress, useToast } from "@chakra-ui/react";
import axios, { CancelTokenSource } from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineCloudUpload } from "react-icons/md";
import axiosInstance from "src/utils/axiosInstance";

function MyDropzone(): JSX.Element {
    const [progress, setProgress] = useState(0);
    const [canceler, setCanceler] = useState<{
        source: CancelTokenSource | null;
    }>({
        source: null,
    });
    const toast = useToast();

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const source = axios.CancelToken.source();
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        try {
            const result = await axiosInstance.post("/songs", formData, {
                cancelToken: source.token,
                onUploadProgress: (p) => {
                    if (!canceler.source) {
                        setCanceler({ source });
                    }
                    setProgress((p.loaded / p.total) * 100);
                },
                headers: {
                    "Content-type": "audio/mp3",
                },
            });

            if (result) {
                toast({
                    title: "Upload successull",
                    description: "Upload successfull",
                    status: "success",
                });
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
                h="400px"
                border="2px dotted black"
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
                    my={10}
                    width={200}
                    height={200}
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

export default MyDropzone;
