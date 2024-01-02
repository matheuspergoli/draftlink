'use server'

import { revalidatePath } from 'next/cache'

import { createAuthorizedAction } from '@/libs/action'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface DeleteLinkProps {
	id: string
}

export const deleteLink = createAuthorizedAction(
	async (props: DeleteLinkProps, session) => {
		try {
			const link = await prisma.link.delete({
				where: {
					id: props.id,
					site: {
						userId: session.user.id
					}
				}
			})

			revalidatePath('/')

			return right({
				message: 'Link deletado',
				data: link
			})
		} catch (error) {
			return left({
				message: 'Ocorreu um erro ao deletar o link',
				cause: error
			})
		}
	}
)
