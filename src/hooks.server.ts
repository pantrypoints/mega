import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

/* ------------------ 🌍 PARAGLIDE LANGUAGE MIDDLEWARE ------------------ */
const handleParaglide: Handle = ({ event, resolve }) => {
  const lang = event.cookies.get('lang') ?? 'en';

  return paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
    });
  });
};

/* ------------------ 🗄 DATABASE LOADER ------------------ */
const handleDatabase: Handle = async ({ event, resolve }) => {
  event.locals.db = getDb(event.platform?.env); // Local OR Cloudflare
  return resolve(event);
};

/* ------------------ 🔐 AUTH + ROUTING ENFORCEMENT ------------------ */
const handleAuth: Handle = async ({ event, resolve }) => {
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

  /* 🏁 Public routes allowed without login */
  const PUBLIC_STARTS = ['/login', '/register', '/api/', '/stats', '/products', '/services', '/products/[id]', '/services/[id]'];

  const path = event.url.pathname;
  const isPublic = PUBLIC_STARTS.some(p => path.startsWith(p));

  if (!event.locals.user && !isPublic) throw redirect(302, '/login');             // protect all private routes
  if (event.locals.user && (path === '/login' || path === '/register')) throw redirect(302, '/posts');
  if (event.locals.user && path === '/') throw redirect(302, '/posts');           // logged in → homepage posts

  return resolve(event);
};

/* 📌 FINAL COMBINED HANDLER */
export const handle: Handle = sequence(handleParaglide, handleDatabase, handleAuth);

