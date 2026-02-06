import { tracker } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';




// A 1x1 transparent GIF pixel (Base64)
const PIXEL_BINARY = Buffer.from(
	'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
	'base64'
);

export const GET: RequestHandler = async ({ params, request, locals, url }) => {
	const emailId = params.id;
	const db = locals.db;
	
	// 1. Get Title from query param (optional: ?title=Newsletter)
	const title = url.searchParams.get('title') || 'Untitled Email';

	// 2. Identify Country
	// Note: headers vary by host (Vercel, Cloudflare, etc.)
	const country = 
		request.headers.get('x-vercel-ip-country') || 
		request.headers.get('cf-ipcountry') || 
		'Unknown';

	// 3. Identify Device (Simple User-Agent Parsing)
	const ua = request.headers.get('user-agent') || '';
	let device = 'Desktop';
	if (/mobile/i.test(ua)) device = 'Mobile';
	if (/tablet/i.test(ua)) device = 'Tablet';
	if (/bot|spider|crawl/i.test(ua)) device = 'Bot';

	// 4. Log the instance (Don't await if you want max speed, 
	// but awaiting ensures data integrity)
	try {
		await db.insert(tracker).values({
			emailId,
			title,
			country,
			device
		});
	} catch (err) {
		console.error('Tracking failed:', err);
	}

	// 5. Return the transparent pixel
	return new Response(PIXEL_BINARY, {
		headers: {
			'Content-Type': 'image/gif',
			// Prevent browsers from caching the image so it fires every time
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			'Pragma': 'no-cache',
			'Expires': '0'
		}
	});
};