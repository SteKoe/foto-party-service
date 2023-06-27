'use client';

import styles from "./TakePicture.module.css";
import {ChangeEvent, useState} from "react";

export function TakePicture() {
    const [image, setImage] = useState<File | null>(null);

    async function submitForm() {
        if (image) {
            const filename = encodeURIComponent(image.name)
            const fileType = encodeURIComponent(image.type)

            const res = await fetch(
                `/api/upload-url?file=${filename}&fileType=${fileType}`
            )
            const {url, fields} = await res.json()
            console.log(url, fields);
            
            const formData = new FormData()
            Object.entries({...fields, file: image}).forEach(([key, value]) => {
                formData.append(key, value as string)
            })
            

            const upload = await fetch(url, {
                method: 'POST',
                body: formData,
            })

            if (upload.ok) {
                resetForm();
            } else {
                console.error('Upload failed.')
            }
        }
    }

    function resetForm() {
        setImage(null);

        let elementById = document.getElementById("preview");
        if (elementById) {
            elementById.style.backgroundImage = "";
        }
    }

    function previewImage(event: ChangeEvent<HTMLInputElement>) {
        let files = event.target.files
        if (files && files.length === 1) {
            let file = files[0];
            setImage(file);

            let imager = document.createElement("img");
            imager.src = URL.createObjectURL(file);
            let elementById = document.getElementById("preview");
            if (elementById) {
                elementById.style.backgroundImage = "url(" + URL.createObjectURL(file) + ")";
            }
        }
    }

    let labelText = (
        <div className={styles.cameraButtonLabel}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
            Klick mich und mach ein Foto!
        </div>);
    return (
        <form>
            <label className={styles.cameraButton} id="preview">
                {image ? '' : labelText}
                <input type="file" accept="image/*" capture
                       onChange={previewImage}/>
            </label>
            {image ? (
                <div className={styles.controls}>
                    <button type="button" className={styles.btn} onClick={submitForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 448 512">
                            <path
                                d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/>
                        </svg>
                    </button>
                    <button type="reset" className={styles.btn} onClick={resetForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 384 512">
                            <path
                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>

                    </button>
                </div>
            ) : ''}
        </form>
    )
}