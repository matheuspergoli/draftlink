import React from 'react'

import { toast } from 'sonner'

import { deleteFromCloudinary, uploadToCloudinary } from '@/libs/cloudinary'
import { isLeft, isRight } from '@/libs/either'

import { editSiteAppearance, getSite } from '../actions'
import { SiteLogoBuilder } from '../entities/site-logo'

interface EditSiteAppearanceForm {
	id: string
	logoFormData: FormData
}

export const useEditSiteAppearance = () => {
	const [isPending, startTransition] = React.useTransition()

	const edit = async ({ id: siteId, logoFormData }: EditSiteAppearanceForm) => {
		if (typeof logoFormData.get('file') !== 'object') {
			toast.error('Ocorreu um erro ao editar o site', {
				description: 'Você precisa enviar uma imagem'
			})
			return
		}

		const logoImage = logoFormData.get('file') as File

		if (logoImage.size / 1024 / 1024 > 5) {
			toast.error('Ocorreu um erro ao editar o site', {
				description: 'A imagem não pode ser maior que 5MB'
			})
			return
		}

		if (
			!logoImage.type.includes('png') &&
			!logoImage.type.includes('jpeg') &&
			!logoImage.type.includes('jpg')
		) {
			toast.error('Ocorreu um erro ao editar o site', {
				description: 'Tipo de arquivo não suportado (apenas png, jpeg, jpg)'
			})
			return
		}

		startTransition(async () => {
			const oldSite = await getSite({ id: siteId })

			if (isLeft(oldSite)) {
				toast.error('Ocorreu um erro ao editar o site', {
					description: oldSite.error.message
				})
				return
			}

			if (oldSite.value.data.logo?.publicId) {
				await deleteFromCloudinary({
					publicId: oldSite.value.data.logo?.publicId as string
				})
			}

			const { publicId, url } = await uploadToCloudinary({
				formData: logoFormData
			})

			const siteLogoBuilder = new SiteLogoBuilder()

			const siteLogo = siteLogoBuilder
				.withImage(url as string)
				.withPublicId(publicId as string)
				.build()
				.toObject()

			const editedSite = await editSiteAppearance({
				id: siteId,
				logo: {
					url: siteLogo.image,
					publicId: siteLogo.publicId
				}
			})

			if (isRight(editedSite)) {
				toast.success('Site editado com sucesso', {
					description: `O site ${editedSite.value.data.name} foi atualizado com sucesso`
				})
			}
		})
	}

	return { edit, isPending }
}
