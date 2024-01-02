'use server'

import { createAuthorizedAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

export const getUserSites = createAuthorizedAction(async (_, session) => {
	try {
		const sites = await prisma.site.findMany({
			where: {
				userId: session.user.id
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				logo: true
			}
		})

		if (!sites) {
			return left({
				message: 'Sites não encontrados',
				cause: null
			})
		}

		return right({
			message: 'Sites encontrados',
			data: sites
		})
	} catch (error) {
		return left({
			message: 'Ocorreu um erro ao buscar os sites',
			cause: error
		})
	}
})
