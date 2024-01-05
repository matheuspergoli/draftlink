import { NextRequest } from 'next/server'

export const LoggingMiddleware = (request: NextRequest) => {
	console.log(`[Logging Middleware] Log from [Path] ${request.nextUrl.pathname}`)
}
