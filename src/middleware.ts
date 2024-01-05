import { createMiddleware } from '@/libs/middleware'
import { loggingMiddleware } from '@/middlewares/logging-middleware'
import { rateLimitMiddleware } from '@/middlewares/rate-limit-middleware'
import { rewriteMiddleware } from '@/middlewares/rewrite-middleware'

export default createMiddleware({
	'*': [loggingMiddleware, rewriteMiddleware, rateLimitMiddleware]
})

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
}
