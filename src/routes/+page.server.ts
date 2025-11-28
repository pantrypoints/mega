import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const userId = cookies.get('userId');

    if (userId) {
        // user already logged in → go to /posts
        throw redirect(302, '/posts');
    }

    return {};
};


