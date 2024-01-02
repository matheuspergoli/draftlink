import { LoggingMiddleware } from '@/middlewares/logging-middleware'
import { RateLimitMiddleware } from '@/middlewares/rate-limit-middleware'
import { RewriteMiddleware } from '@/middlewares/rewrite-middleware'
import { StackMiddleware } from '@/middlewares/stack-middleware'

export default StackMiddleware([
	LoggingMiddleware,
	RateLimitMiddleware,
	RewriteMiddleware
])

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
}
