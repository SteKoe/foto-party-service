import {ActionIcon, Box, Button, Group, Image, Overlay, SimpleGrid, Text} from '@mantine/core';
import {IconPhoto, IconTrash, IconUpload, IconX} from '@tabler/icons-react';
import {Dropzone, DropzoneProps, FileRejection, FileWithPath, IMAGE_MIME_TYPE, MIME_TYPES} from '@mantine/dropzone';
import {useTranslations} from "next-intl";
import {toast} from "react-toastify";
import {useState} from 'react';
import {useMitt} from "@/components/provider/mitt";
import "react-toastify/dist/ReactToastify.css";

export function DropZone(props: Partial<DropzoneProps>) {
    const t = useTranslations();
    const [images, setImages] = useState<FileWithPath[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const {emitter} = useMitt();

    const onRemoveImage = (file: FileWithPath) => {
        setImages((existingFiles) => existingFiles.filter((existingFile) => existingFile !== file));
    }

    const onDropHandler = (files: FileWithPath[]) => {
        setImages((existingFiles) => [...existingFiles, ...files]);
    }

    const onRejectHandler = (files: FileRejection[]) => {
        toast(t("take_picture.file_too_large"))
        console.log(files)
    }

    const previews = images.map((file, index) => {
        return <ImagePreview key={index} disabled={isUploading} image={file} onRemoveImage={onRemoveImage}/>;
    });

    const onUploadHandler = async () => {
        if (Array.isArray(images) && images.length > 0 && !isUploading) {
            setIsUploading(true);

            try {
                const promises: Array<Promise<Response>> = [];
                for (const image of images) {
                    promises.push(
                        fetch(
                            `/api/media`,
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": image.type,
                                },
                                body: await image.arrayBuffer(),
                            },
                        ),
                    );
                }

                const results = await Promise.allSettled(promises);

                if (results.every((result) => result.status === "fulfilled")) {
                    toast(t("take_picture.upload_successful", {count: images.length}));
                    emitter.emit("picture.uploaded");
                } else {
                    toast.error(t("take_picture.upload_failed"));
                    console.error("Upload failed.");
                }
            } catch (e) {
                toast.error(t("take_picture.upload_failed"));
                console.error("Upload failed.", e);
            } finally {
                setIsUploading(false);
                setImages([]);
            }
        }
    }


    return (
        <div className="border border-gray-300 rounded-xl p-4">
            <Dropzone
                onDrop={onDropHandler}
                onReject={onRejectHandler}
                maxSize={10 * 1024 ** 2}
                disabled={isUploading}
                accept={[...IMAGE_MIME_TYPE, MIME_TYPES.mp4]}
                {...props}
            >
                <Group justify="center" gap="xl" mih={220} style={{pointerEvents: 'none'}}>
                    <Dropzone.Accept>
                        <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5}/>
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5}/>
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5}/>
                    </Dropzone.Idle>

                    <div className="relative">
                        <Text size="xl" inline>
                            {t('take_picture.button')}
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            {t('take_picture.button_info')}
                        </Text>
                    </div>
                </Group>
            </Dropzone>

            
            <SimpleGrid cols={{base: 1, sm: 4}} mt={previews.length > 0 ? 'xl' : 0}>
                {previews}
            </SimpleGrid>

            {images.length > 0 && (
                <Button fullWidth mt="lg" onClick={onUploadHandler} loading={isUploading}>
                    {t('take_picture.upload')}
                </Button>
            )}
        </div>
    );
}

type ImagePreviewProps = {
    readonly image: FileWithPath,
    readonly onRemoveImage?: (file: FileWithPath) => void,
    readonly disabled?: boolean
}

function ImagePreview({image, onRemoveImage, disabled = false}: ImagePreviewProps) {
    const imageUrl = URL.createObjectURL(image);
    const [hovered, setHovered] = useState(false);

    return (
        <Box
            pos="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{cursor: 'pointer'}}
        >
            <Image src={imageUrl} className="w-full h-full object-center"
                   onLoad={() => URL.revokeObjectURL(imageUrl)}/>

            {hovered && !disabled && (
                <>
                    <Overlay
                        opacity={0.6}
                        color="#000"
                        zIndex={1}
                        radius="md"
                    />
                    <ActionIcon
                        onClick={onRemoveImage?.bind(null, image)}
                        variant="filled"
                        radius="xl"
                        size="xl"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            zIndex: 2,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <IconTrash size={24} />
                    </ActionIcon>
                </>
            )}
        </Box>
    );
}