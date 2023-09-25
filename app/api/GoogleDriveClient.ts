import {google} from "googleapis";
import * as stream from "stream";

const createAuthClient = () => {
    const authClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    )
    authClient.setCredentials({refresh_token: process.env.GOOGLE_REFRESH_TOKEN})
    return authClient;
}

export async function uploadImage(filename: string, blob: Buffer) {
    try {
        const drive = google.drive({version: 'v3', auth: createAuthClient()});

        let bufferStream = new stream.PassThrough();
        bufferStream.end(blob);

        return await drive.files.create({
            media: {
                mimeType: `image/${filename.split('.').pop()}`,
                body: bufferStream
            },
            requestBody: {
                name: filename,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!]
            },
        });
    } catch (e) {
        console.error("Error uploading file", e)
    }
}

export async function listFiles(): Promise<(string | null | undefined)[] | undefined> {
    const drive = google.drive({version: 'v3', auth: createAuthClient()});

    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        orderBy: 'modifiedTime desc'
    })

    console.log(res.data);

    return res.data?.files?.map(f => f.id);
}

export async function getFile(fileId: string): Promise<ArrayBuffer> {
    const drive = google.drive({version: 'v3', auth: createAuthClient()});

    const res = await drive.files.get({
        fileId,
        alt: 'media'
    }, {responseType: 'arraybuffer'})

    return res.data as ArrayBuffer
}

export async function deleteFile(fileId: string) {
    const drive = google.drive({version: 'v3', auth: createAuthClient()});

    const res = await drive.files.delete({
        fileId
    })

    return res.status;
}