import { NextRequest, NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import { env } from '@/environment/env'
import { rateLimit } from '@/libs/rate-limit'

/**
 * @limiter_config - Configuração do rate limit para 500 requisições por hora
 */

const limiter = rateLimit({
	limit: 500,
	interval: 60 * 60 * 1000 // 1 hour
})

export const rateLimitMiddleware = async (request: NextRequest) => {
	/**
	 * @rate_limit - Exemplo de middleware de rate limit para todas as rotas que começam com '/api/site'
	 * @config - Utilizando o Token-JWT para limitar as requisições com base no sub do token (id do usuário)
	 * @ip - Também podemos utilizar o IP do usuário para limitar as requisições, utilizando request.ip (não recomendado)
	 */

	if (request.method === 'POST') {
		const token = await getToken({
			req: request,
			secret: env.NEXTAUTH_SECRET
		})

		const { isRateLimited, limit, currentUsage } = limiter.check(token?.sub as string)
		console.log(`[RATE USAGE] ${currentUsage}/${limit}`)

		if (isRateLimited) {
			return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
		}
	}
}
