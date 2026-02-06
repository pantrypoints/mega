import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

/* ------------------ 🗄 DATABASE LOADER ------------------ */
// Move this UP so db is available to everyone else
const handleDatabase: Handle = async ({ event, resolve }) => {
  event.locals.db = getDb(event.platform?.env); 
  return resolve(event);
};

/* ------------------ 🌍 PARAGLIDE LANGUAGE MIDDLEWARE ------------------ */
const handleParaglide: Handle = ({ event, resolve }) => {
  return paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;
    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
    });
  });
};

/* ------------------ 🔐 AUTH + ROUTING ENFORCEMENT ------------------ */
const handleAuth: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;

  // 1. Bypass check - API and Tracking should not trigger redirects
  if (path.startsWith('/api/') || path.startsWith('/tracking')) {
    return resolve(event);
  }

  // 2. Safety check: Ensure DB exists before auth logic
  if (!event.locals.db) {
    event.locals.db = getDb(event.platform?.env);
  }

  const sessionToken = event.cookies.get(auth.sessionCookieName);

  if (sessionToken) {
    const { session, user } = await auth.validateSessionToken(event.locals.db, sessionToken);

    if (session) auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    else auth.deleteSessionTokenCookie(event);

    event.locals.user = user;
    event.locals.session = session;
  } else {
    event.locals.user = null;
    event.locals.session = null;
  }

  /* 🏁 Public routes check */
  const PUBLIC_STARTS = ['/login', '/register', '/api/', '/stats', '/tracking', '/products', '/services'];
  const isPublic = PUBLIC_STARTS.some(p => path.startsWith(p) || path.startsWith(`/en${p}`) || path.startsWith(`/vi${p}`));

  // Guard clauses
  if (!event.locals.user && !isPublic) throw redirect(302, '/login');
  if (event.locals.user && (path === '/login' || path === '/register' || path === '/')) {
    throw redirect(302, '/posts');
  }

  return resolve(event);
};

/* 📌 FINAL COMBINED HANDLER */
// Database first -> then Paraglide -> then Auth
export const handle: Handle = sequence(handleDatabase, handleParaglide, handleAuth);


// import { sequence } from '@sveltejs/kit/hooks';
// import type { Handle } from '@sveltejs/kit';
// import { paraglideMiddleware } from '$lib/paraglide/server';
// import * as auth from '$lib/server/auth';
// import { redirect } from '@sveltejs/kit';
// import { getDb } from '$lib/server/db';

// /* ------------------ 🌍 PARAGLIDE LANGUAGE MIDDLEWARE ------------------ */
// const handleParaglide: Handle = ({ event, resolve }) => {
//   const lang = event.cookies.get('lang') ?? 'en';

//   return paraglideMiddleware(event.request, ({ request, locale }) => {
//     event.request = request;

//     return resolve(event, {
//       transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
//     });
//   });
// };

// /* ------------------ 🗄 DATABASE LOADER ------------------ */
// const handleDatabase: Handle = async ({ event, resolve }) => {
//   event.locals.db = getDb(event.platform?.env); // Local OR Cloudflare
//   return resolve(event);
// };

// /* ------------------ 🔐 AUTH + ROUTING ENFORCEMENT ------------------ */
// const handleAuth: Handle = async ({ event, resolve }) => {

//   const path = event.url.pathname;

//   // 1. STRATEGIC BYPASS: If it's an API or Tracking call, resolve immediately.
//   // This prevents Paraglide or Auth from messing with the raw response.
//   if (path.startsWith('/api/') || path.startsWith('/tracking')) {
//     return resolve(event);
//   }


//   const sessionToken = event.cookies.get(auth.sessionCookieName);

//   if (sessionToken) {
//     const { session, user } = await auth.validateSessionToken(event.locals.db, sessionToken);

//     if (session) auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
//     else auth.deleteSessionTokenCookie(event);

//     event.locals.user = user;
//     event.locals.session = session;
//   } else {
//     event.locals.user = null;
//     event.locals.session = null;
//   }

//   /* 🏁 Public routes allowed without login */
//   const PUBLIC_STARTS = ['/login', '/register', '/api/', '/stats', '/tracking', '/products', '/services', '/products/[id]', '/services/[id]'];
  

//   // const isPublic = PUBLIC_STARTS.some(p => path.startsWith(p));
//   const isPublic = PUBLIC_STARTS.some(p => path.startsWith(p) || path.startsWith(`/en${p}`) || path.startsWith(`/vi${p}`));

//   if (!event.locals.user && !isPublic) throw redirect(302, '/login');             // protect all private routes
//   if (event.locals.user && (path === '/login' || path === '/register')) throw redirect(302, '/posts');
//   if (event.locals.user && path === '/') throw redirect(302, '/posts');           // logged in → homepage posts

//   return resolve(event);
// };

// /* 📌 FINAL COMBINED HANDLER */
// export const handle: Handle = sequence(handleParaglide, handleDatabase, handleAuth);

