import ImageKit from 'imagekit';
import { json } from '@sveltejs/kit';
import { PUBLIC_IMAGEKIT_URL_ENDPOINT, PUBLIC_IMAGEKIT_PUBLIC_KEY } from '$env/static/public';
import { IMAGEKIT_PRIVATE_KEY } from '$env/static/private';

const imagekit = new ImageKit({
    urlEndpoint: PUBLIC_IMAGEKIT_URL_ENDPOINT,
    publicKey: PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY
});

export const GET = async () => {
    return json(imagekit.getAuthenticationParameters());
};

