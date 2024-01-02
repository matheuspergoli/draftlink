'use server'

import { createAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface GetLinksProps {
	siteId: string
}

export const getLinks = createAction(async (props: GetLinksProps) => {
	try {
		const links = await prisma.link.findMany({
			where: {
				site: {
					id: props.siteId
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		if (!links) {
			return left({
				message: 'Links não encontrados',
				cause: null
			})
		}

		return right({
			message: 'Links encontrados',
			data: links
		})
	} catch (error) {
		return left({
			message: 'Ocorreu um erro ao buscar os links',
			cause: error
		})
	}
})
