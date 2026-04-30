
import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

// Add CORS headers to all responses
function withCORS(fn) {
	return async (request, ...args) => {
		// Handle preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
				},
			});
		}
		const response = await fn(request, ...args);
		// Clone and add CORS headers
		const newHeaders = new Headers(response.headers);
		newHeaders.set("Access-Control-Allow-Origin", "*");
		newHeaders.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
		newHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: newHeaders,
		});
	};
}

export const GET = withCORS(handler.GET);
export const POST = withCORS(handler.POST);
export const PUT = withCORS(handler.PUT || (async () => new Response(null, { status: 405 })));
export const DELETE = withCORS(handler.DELETE || (async () => new Response(null, { status: 405 })));
export const OPTIONS = withCORS(async () => new Response(null, { status: 204 }));