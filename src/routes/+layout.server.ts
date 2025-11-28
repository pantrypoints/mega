import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
    
    // allow public pages
    const publicRoutes = ['/login', '/register', '/stats'];

    if (!locals.user && !publicRoutes.includes(url.pathname)) {
        throw redirect(302, '/stats');
    }
    return { user: locals.user };
};
