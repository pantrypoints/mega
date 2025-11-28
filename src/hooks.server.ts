import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

// Database initialization
const handleDatabase: Handle = async ({ event, resolve }) => {

	// Initialize db with platform env if available (Cloudflare), otherwise use local env
	event.locals.db = getDb(event.platform?.env);
	return resolve(event);
};


// Auth + global redirect here
const handleAuth: Handle = async ({ event, resolve }) => {

	// Your existing session cookie system
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (sessionToken) {
		const { session, user } = await auth.validateSessionToken(sessionToken);
		if (session) auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		else auth.deleteSessionTokenCookie(event);
		event.locals.user = user;
		event.locals.session = session;
	} else {
		event.locals.user = null;
		event.locals.session = null;
	}

	// ⛔ Redirect to login if not authenticated 🟢 but allow access to public pages
	// NOTE: We do not include '/' here, as we handle it separately below.
	const PUBLIC_STARTS = ['/login', '/register', '/api/', '/stats']; 
	
	const pathname = event.url.pathname;
	
	// Check if the current path starts with any of the public paths
	const isPublicPath = PUBLIC_STARTS.some(path => pathname.startsWith(path));

	// If user is not logged in AND the path is not public (e.g., /posts, /settings, etc.)
	if (!event.locals.user && !isPublicPath) {
		
		// If the user lands on the root path, redirect to login
		if (pathname === '/') {
			throw redirect(302, '/login');
		}

		// If the user lands on any other protected page (e.g., /posts), redirect to login
		throw redirect(302, '/login');
	}
	
	// Redirect logged-in users away from the login/register pages ---
	if (event.locals.user && (pathname === '/login' || pathname === '/register')) {
		// Redirect logged-in users to the home page (the posts feed, or whatever the default landing page is)
		throw redirect(302, '/posts'); 
	}
	
	// Redirect logged-in users from the root path '/' to their landing page ---
	if (event.locals.user && pathname === '/') {
		throw redirect(302, '/posts');
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleDatabase, handleAuth);
