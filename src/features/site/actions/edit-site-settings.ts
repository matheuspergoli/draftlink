'use server'

import { revalidatePath } from 'next/cache'

import { createAuthorizedAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface SettingsProps {
	id: string
	name: string
	description: string
	subdomain: string
}

export const editSiteSettings = createAuthorizedAction(
	async (props: SettingsProps, session) => {
		try {
			const site = await prisma.site.update({
				where: {
					id: props.id,
					userId: session.user.id
				},
				data: {
					name: props.name,
					description: props.description,
					subdomain: props.subdomain
				}
			})

			revalidatePath('/')
			revalidatePath(`/site/${props.id}/settings`)

			return right({
				data: site,
				message: 'Site atualizado com sucesso'
			})
		} catch (error) {
			return left({
				message: 'Erro ao atualizar site',
				cause: error
			})
		}
	}
)
