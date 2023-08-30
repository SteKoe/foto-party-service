import {google} from "googleapis";

const drive = google.drive({
    version: 'v3',
    auth: 'AIzaSyBBtzBjf5afDFUZx2CVy7e33NF2eL1o0pQ'
});

export default async function main() {
    const res = await drive.files.list({
        q: `'1LumFp8Nh7q-4u9S3MfG2saE8NLGM3Xwy' in parents`
    })
    
    console.log(res);
}

