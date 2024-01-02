'use server'

import { createAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

export const getAllSites = createAction(async () => {
	try {
		const sites = await prisma.site.findMany({})

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
