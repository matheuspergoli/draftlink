import { createMiddleware } from '@/libs/middleware'
import { LoggingMiddleware } from '@/middlewares/logging-middleware'
import { RateLimitMiddleware } from '@/middlewares/rate-limit-middleware'
import { RewriteMiddleware } from '@/middlewares/rewrite-middleware'

export default createMiddleware({
	'*': [LoggingMiddleware, RewriteMiddleware, RateLimitMiddleware]
})

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
}
