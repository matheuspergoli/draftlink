'use server'

import { revalidatePath } from 'next/cache'

import { createAuthorizedAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface CreateLinkProps {
	id: string
	url: string
	name: string
	nsfw: boolean
	siteId: string
	description: string
}

export const createLink = createAuthorizedAction(
	async (params: CreateLinkProps, session) => {
		try {
			const linksCount = await prisma.link.count({
				where: {
					site: {
						id: params.siteId,
						userId: session.user.id
					}
				}
			})

			if (linksCount >= 6) {
				return left({
					message: 'Você já atingiu o limite de links',
					cause: null
				})
			}

			const link = await prisma.link.create({
				data: {
					id: params.id,
					url: params.url,
					name: params.name,
					nsfw: params.nsfw,
					description: params.description,
					site: {
						connect: {
							id: params.siteId
						}
					}
				}
			})

			revalidatePath('/')

			return right({
				message: 'Link criado',
				data: link
			})
		} catch (error) {
			return left({
				message: 'Ocorreu um erro ao criar o link',
				cause: error
			})
		}
	}
)
