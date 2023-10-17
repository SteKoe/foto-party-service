import {z} from "zod";


const tokenSchema = z.object({
    rsvpGroupId: z.string().optional()
}).strict();

export type AuthToken = z.infer<typeof tokenSchema>;

export const encryptSymmetric = async (plaintext: string, key: string) => {
    // create a random 96-bit initialization vector (IV)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // encode the text you want to encrypt
    const encodedPlaintext = new TextEncoder().encode(plaintext);

    // prepare the secret key for encryption
    const secretKey = await crypto.subtle.importKey('raw', Buffer.from(key, 'base64'), {
        name: 'AES-GCM',
        length: 256
    }, true, ['encrypt', 'decrypt']);

    // encrypt the text with the secret key
    const ciphertext = await crypto.subtle.encrypt({
        name: 'AES-GCM',
        iv
    }, secretKey, encodedPlaintext);

    // return the encrypted text "ciphertext" and the IV
    // encoded in base64
    return ({
        ciphertext: Buffer.from(ciphertext).toString('base64'),
        iv: Buffer.from(iv).toString('base64')
    });
}

export const decryptSymmetric = async ({ciphertext, iv}: {ciphertext: string, iv: string}) => {
    // prepare the secret key
    const secretKey = await crypto.subtle.importKey(
        'raw',
        Buffer.from(process.env.CRYPTO_SECRET!, 'base64'),
        {
            name: 'AES-GCM',
            length: 256
        }, true, ['encrypt', 'decrypt']);

    // decrypt the encrypted text "ciphertext" with the secret key and IV
    const cleartext = await crypto.subtle.decrypt({
        name: 'AES-GCM',
        iv: Buffer.from(iv, 'base64'),
    }, secretKey, Buffer.from(ciphertext, 'base64'));

    // decode the text and return it
    return new TextDecoder().decode(cleartext);
}

export async function decryptToken(authToken?: string | null): Promise<AuthToken | null> {
    try {
        const encodedToken = JSON.parse(Buffer.from(authToken ?? '', 'base64').toString('utf-8'));
        const decodedTokenText = await decryptSymmetric(encodedToken);
        return tokenSchema.parse(JSON.parse(decodedTokenText));
    } catch (e) {
        return null;
    }
}