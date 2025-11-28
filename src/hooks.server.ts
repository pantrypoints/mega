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


// 🔐 Auth + global redirect here
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
	const PUBLIC_STARTS = ['/login', '/register', '/api/', '/stats']; 
	
	// Check if the current path starts with any of the public paths
	const isPublicPath = PUBLIC_STARTS.some(path => event.url.pathname.startsWith(path));

	// The base path '/' must be explicitly checked if you want it to be public
	const isRootPath = event.url.pathname === '/';
	if (!event.locals.user && !isPublicPath && !isRootPath) {
		throw redirect(302, '/login');
	}
	
	// You also need to handle the case where a logged-in user tries to access /login
	if (event.locals.user && (event.url.pathname === '/login' || event.url.pathname === '/register')) {
		// Redirect logged-in users to the home page or dashboard
		throw redirect(302, '/'); 
	}
	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleDatabase, handleAuth);










// import { sequence } from '@sveltejs/kit/hooks';
// import * as auth from '$lib/server/auth';
// import type { Handle } from '@sveltejs/kit';
// import { paraglideMiddleware } from '$lib/paraglide/server';

// const handleParaglide: Handle = ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
// 	event.request = request;

// 	return resolve(event, {
// 		transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
// 	});
// });

// const handleAuth: Handle = async ({ event, resolve }) => {
// 	const sessionToken = event.cookies.get(auth.sessionCookieName);

// 	if (!sessionToken) {
// 		event.locals.user = null;
// 		event.locals.session = null;
// 		return resolve(event);
// 	}

// 	const { session, user } = await auth.validateSessionToken(sessionToken);

// 	if (session) {
// 		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
// 	} else {
// 		auth.deleteSessionTokenCookie(event);
// 	}

// 	event.locals.user = user;
// 	event.locals.session = session;
// 	return resolve(event);
// };

// export const handle: Handle = sequence(handleParaglide, handleAuth);


// import { sequence } from '@sveltejs/kit/hooks';
// import type { Handle } from '@sveltejs/kit';
// import { paraglideMiddleware } from '$lib/paraglide/server';
// import * as auth from '$lib/server/auth';
// import { redirect } from '@sveltejs/kit';

// const handleParaglide: Handle = ({ event, resolve }) =>
// 	paraglideMiddleware(event.request, ({ request, locale }) => {
// 		event.request = request;

// 		return resolve(event, {
// 			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
// 		});
// 	});

// const handleAuth: Handle = async ({ event, resolve }) => {
// 	// Your existing session cookie system
// 	const sessionToken = event.cookies.get(auth.sessionCookieName);

// 	if (sessionToken) {
// 		const { session, user } = await auth.validateSessionToken(sessionToken);

// 		if (session) auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
// 		else auth.deleteSessionTokenCookie(event);

// 		event.locals.user = user;
// 		event.locals.session = session;
// 	} else {
// 		event.locals.user = null;
// 		event.locals.session = null;
// 	}

// 	// ⛔ Redirect to login if not authenticated 🟢 but allow access to public pages
//     const PUBLIC_STARTS = ['/login', '/register', '/api/']; 
    
//     // Check if the current path starts with any of the public paths
//     const isPublicPath = PUBLIC_STARTS.some(path => event.url.pathname.startsWith(path));

//     // The base path '/' must be explicitly checked if you want it to be public
//     const isRootPath = event.url.pathname === '/';

//     if (!event.locals.user && !isPublicPath && !isRootPath) {
//         throw redirect(302, '/login');
//     }

//     // You also need to handle the case where a logged-in user tries to access /login
//     if (event.locals.user && (event.url.pathname === '/login' || event.url.pathname === '/register')) {
//         // Redirect logged-in users to the home page or dashboard
//         throw redirect(302, '/'); 
//     }

// 	return resolve(event);
// };

// export const handle: Handle = sequence(handleParaglide, handleAuth);


