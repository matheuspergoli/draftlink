'use server'

import { revalidatePath } from 'next/cache'

import { createAuthorizedAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface CreateSiteProps {
	id: string
	name: string
	description: string
	subdomain: string
}

export const createSite = createAuthorizedAction(
	async (params: CreateSiteProps, session) => {
		try {
			const sitesCount = await prisma.site.count({
				where: {
					userId: session.user.id
				}
			})

			if (sitesCount >= 6) {
				return left({
					message: 'Você já atingiu o limite de sites',
					cause: null
				})
			}

			const site = await prisma.site.create({
				data: {
					id: params.id,
					name: params.name,
					description: params.description,
					subdomain: params.subdomain,
					user: {
						connect: {
							id: session.user.id
						}
					},
					logo: {
						create: {}
					}
				}
			})

			revalidatePath('/')

			return right({
				message: 'Site criado',
				data: site
			})
		} catch (error) {
			return left({
				message: 'Ocorreu um erro ao criar o site',
				cause: error
			})
		}
	}
)
