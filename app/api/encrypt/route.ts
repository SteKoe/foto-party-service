import {encryptSymmetric} from "@/utils/crypto";

export async function POST(request: Request) {
    const response = await encryptSymmetric(await request.text(), process.env.CRYPTO_SECRET!);
    return new Response(Buffer.from(JSON.stringify(response)).toString('base64'));
}
