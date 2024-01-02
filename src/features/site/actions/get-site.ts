'use server'

import { createAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface GetSiteParams {
	id?: string
	subdomain?: string
}

export const getSite = createAction(async ({ id, subdomain }: GetSiteParams) => {
	try {
		const site = await prisma.site.findFirst({
			where: {
				id: id ?? undefined,
				subdomain: subdomain ?? undefined
			},
			include: {
				logo: true
			}
		})

		if (!site) {
			return left({
				message: 'Site não encontrado',
				cause: null
			})
		}

		return right({
			message: 'Site encontrado',
			data: site
		})
	} catch (error) {
		return left({
			message: 'Ocorreu um erro ao buscar o site',
			cause: error
		})
	}
})
