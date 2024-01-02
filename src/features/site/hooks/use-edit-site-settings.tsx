import React from 'react'

import { toast } from 'sonner'

import { isLeft, isRight } from '@/libs/either'

import { editSiteSettings, getSite } from '../actions'
import { EditSiteSettingsData, EditSiteSettingsDTO } from '../dtos'
import { SiteEntityBuilder } from '../entities/site'

export const useEditSiteSettings = () => {
	const [isPending, startTransition] = React.useTransition()

	const edit = async (data: EditSiteSettingsData) => {
		const parsedData = EditSiteSettingsDTO.safeParse(data)

		if (!parsedData.success) {
			toast.error('Ocorreu um erro ao editar o site', {
				description: parsedData.error.message
			})
			return
		}

		const { id, name, subdomain, description } = parsedData.data

		startTransition(async () => {
			const siteExists = await getSite({ id })

			if (isLeft(siteExists)) {
				toast.error('Ocorreu um erro ao editar o site', {
					description: siteExists.error.message
				})
				return
			}

			const siteBuilder = new SiteEntityBuilder()

			const site = siteBuilder
				.withId(id)
				.withName(name)
				.withDescription(description)
				.withSubdomain(subdomain)
				.build()
				.toObject()

			const editedSite = await editSiteSettings(site)

			if (isLeft(editedSite)) {
				toast.error('Ocorreu um erro ao editar o site', {
					description: editedSite.error.message
				})
				return
			}

			if (isRight(editedSite)) {
				toast.success('Site editado com sucesso', {
					description: `O site ${editedSite.value.data.name} foi atualizado com sucesso`
				})
			}
		})
	}

	return { edit, isPending }
}
