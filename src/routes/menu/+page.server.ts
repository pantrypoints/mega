import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import type { Actions, PageServerLoad } from './$types';



export const load: PageServerLoad = async ({ locals }) => {
    // Check if user exists in locals (populated by hooks)
    const user = locals.user;

    return {
        // If user exists, return it; otherwise return null
        user: user ? { ...user, slug: user.slug } : null,
        unreadMessageCount: 0 // You can add logic here to fetch count if user exists
    };
};




// export const load: PageServerLoad = async () => {
//   const user = requireLogin();
//   return { 
//     user: {
//       ...user,
//       slug: user.slug
//     } 
//   };
// };


export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await auth.invalidateSession(event.locals.db, event.locals.session.id);
    auth.deleteSessionTokenCookie(event);
    return redirect(302, '/');
  },
};

function requireLogin() {
  const { locals } = getRequestEvent();
  if (!locals.user) {
    return redirect(302, "/login");
  }
  return locals.user;
}
