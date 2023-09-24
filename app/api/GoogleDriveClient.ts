import {google} from "googleapis";
import {createReadStream, readFileSync} from "fs";
import path from "path";

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

async function authorize() {
    const jwtClient = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        "",
        process.env.GOOGLE_PRIVATE_KEY,
        SCOPES
    )
    await jwtClient.authorize();
    return jwtClient;
}

async function uploadFile(authClient) {
    const drive = google.drive({version: 'v3', auth: authClient});

    const file = await drive.files.create({
        media: {
            body: createReadStream('/Users/stekoe/workspaces/kiste-heiraten/public/img/bg-top.png')
        },
        fields: 'id',
        requestBody: {
            name: "bg-top.png",
        },
    });
    
    console.log(file);
    
    return file;
}

export default async function listFiles() {
    const auth = await authorize();
    const drive = google.drive({
        version: 'v3',
        auth: auth
    });

    const res = await uploadFile(auth)

    return res.data;
}

