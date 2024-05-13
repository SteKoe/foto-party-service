'use client';

import styles from './TakePicture.module.css';
import React, { ChangeEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export function TakePicture() {
    const router = useRouter();

    const [image, setImage] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    async function submitForm() {
        if (image) {
            setIsUploading(true);

            try {
                const formData = new FormData();
                formData.append('file', image);

                const upload = await fetch('/api/pictures/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (upload.ok) {
                    resetForm();
                    await router.replace('/pictures');
                    toast('Das hat geklappt!');
                } else {
                    toast.error(
                        'Fehler beim Hochladen! Bitte nochmal versuchen.',
                    );
                    console.error('Upload failed.');
                }
            } catch (e) {
                toast.error('Fehler beim Hochladen! Bitte nochmal versuchen.');
                console.error('Upload failed.', e);
            } finally {
                setIsUploading(false);
            }
        }
    }

    function resetForm() {
        setImage(null);

        const elementById = document.getElementById('preview');
        if (elementById) {
            elementById.style.backgroundImage = '';
        }
    }

    function previewImage(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files && files.length === 1) {
            const file = files[0];
            setImage(file);

            const imager = document.createElement('img');
            imager.src = URL.createObjectURL(file);
            const elementById = document.getElementById('preview');
            if (elementById) {
                elementById.style.backgroundImage =
                    'url(' + URL.createObjectURL(file) + ')';
            }
        }
    }

    const labelText = (
        <div className={styles.cameraButtonLabel}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
            >
                <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
            </svg>
            Klick mich, mach ein Foto und lade es hoch!
        </div>
    );

    return (
        <form className="mt-16">
            <ToastContainer position={'top-center'} hideProgressBar={true} />
            <label className={styles.cameraButton} id="preview">
                {image ? '' : labelText}
                {isUploading ? (
                    <div className={styles.loadingOverlay}>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                className={'m-2 animate-spin'}
                                viewBox="0 0 512 512"
                            >
                                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                            </svg>
                            Bild wird hochgeladen!
                        </div>
                    </div>
                ) : (
                    ''
                )}
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={previewImage}
                />
            </label>
            {image ? (
                <div className={styles.controls}>
                    <button
                        type="button"
                        className={styles.btn}
                        onClick={submitForm}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                className={'m-2 animate-spin'}
                                viewBox="0 0 512 512"
                            >
                                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 448 512"
                            >
                                <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" />
                            </svg>
                        )}
                    </button>
                    <button
                        type="reset"
                        className={styles.btn}
                        onClick={resetForm}
                        disabled={isUploading}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 384 512"
                        >
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </button>
                </div>
            ) : (
                ''
            )}
        </form>
    );
}
