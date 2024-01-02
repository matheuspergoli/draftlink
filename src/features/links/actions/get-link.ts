'use server'

import { createAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface GetLinkParams {
	id?: string
	siteId?: string
}

export const getLink = createAction(async ({ id, siteId }: GetLinkParams) => {
	try {
		const link = await prisma.link.findFirst({
			where: {
				id: id ?? undefined,
				siteId: siteId ?? undefined
			}
		})

		if (!link) {
			return left({
				message: 'Link não encontrado',
				cause: null
			})
		}

		return right({
			message: 'Link encontrado',
			data: link
		})
	} catch (error) {
		return left({
			message: 'Ocorreu um erro ao buscar o link',
			cause: error
		})
	}
})
