'use server'

import { revalidatePath } from 'next/cache'

import { createAuthorizedAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface AppearanceProps {
	id: string
	logo: {
		url: string
		publicId: string
	}
}

export const editSiteAppearance = createAuthorizedAction(
	async (props: AppearanceProps, session) => {
		try {
			const siteUpdated = await prisma.site.update({
				where: {
					id: props.id,
					userId: session.user.id
				},
				data: {
					logo: {
						update: {
							image: props.logo.url,
							publicId: props.logo.publicId
						}
					}
				}
			})

			revalidatePath('/')
			revalidatePath(`/site/${props.id}/appearance`)

			return right({
				data: siteUpdated,
				message: 'Site atualizado com sucesso'
			})
		} catch (error) {
			return left({
				cause: error,
				message: 'Erro ao atualizar o site'
			})
		}
	}
)
