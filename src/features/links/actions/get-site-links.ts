'use server'

import { createAuthorizedAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface GetSiteLinksProps {
	siteId: string
}

export const getSiteLinks = createAuthorizedAction(
	async (props: GetSiteLinksProps, session) => {
		try {
			const links = await prisma.link.findMany({
				where: {
					site: {
						id: props.siteId,
						userId: session.user.id
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
	}
)
