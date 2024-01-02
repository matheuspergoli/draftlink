'use server'

import { revalidatePath } from 'next/cache'

import { createAuthorizedAction } from '@/libs/action'
import { deleteFromCloudinary } from '@/libs/cloudinary'
import { left, right } from '@/libs/either'
import { prisma } from '@/libs/prisma'

interface DeleteSiteProps {
	id: string
}

export const deleteSite = createAuthorizedAction(
	async (props: DeleteSiteProps, session) => {
		try {
			const site = await prisma.site.delete({
				where: {
					id: props.id,
					userId: session.user.id
				},
				include: {
					logo: true
				}
			})

			await deleteFromCloudinary({ publicId: site.logo?.publicId as string })

			revalidatePath('/')
			revalidatePath(`/site/${site.id}/settings`)

			return right({
				message: 'Site deletado',
				data: site
			})
		} catch (error) {
			return left({
				message: 'Ocorreu um erro ao deletar o site',
				cause: error
			})
		}
	}
)
