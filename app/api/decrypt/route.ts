import { decryptSymmetric } from '@/utils/crypto';

export async function POST(request: Request) {
    const s = await request.text();
    const encodedToken = JSON.parse(
        Buffer.from(s ?? '', 'base64').toString('utf-8'),
    );
    const response = await decryptSymmetric(encodedToken);
    return new Response(response);
}
