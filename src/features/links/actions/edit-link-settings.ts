'use server'

import { revalidatePath } from 'next/cache'

import { createAuthorizedAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface SettingsProps {
	id: string
	url: string
	name: string
	nsfw: boolean
	description: string
}

export const editLinkSettings = createAuthorizedAction(
	async (props: SettingsProps, session) => {
		try {
			const link = await prisma.link.update({
				where: {
					id: props.id,
					site: {
						userId: session.user.id
					}
				},
				data: {
					url: props.url,
					name: props.name,
					nsfw: props.nsfw,
					description: props.description
				}
			})

			revalidatePath('/')
			revalidatePath(`/link/${props.id}/settings`)

			return right({
				data: link,
				message: 'Link atualizado com sucesso'
			})
		} catch (error) {
			return left({
				message: 'Erro ao atualizar link',
				cause: error
			})
		}
	}
)
