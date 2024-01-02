import React from 'react'

import { toast } from 'sonner'

import { isLeft, isRight } from '@/libs/either'

import { createSite, getSite } from '../actions'
import { CreateSiteData, CreateSiteDTO } from '../dtos'
import { SiteEntityBuilder } from '../entities/site'

export const useCreateSite = () => {
	const [isPending, startTransition] = React.useTransition()

	const create = async (data: CreateSiteData) => {
		const parsedData = CreateSiteDTO.safeParse(data)

		if (!parsedData.success) {
			toast.error('Ocorreu um erro ao criar o site', {
				description: parsedData.error.message
			})
			return
		}

		const { name, subdomain, description } = parsedData.data

		startTransition(async () => {
			const siteExists = await getSite({ subdomain })
			if (isRight(siteExists)) {
				toast.error('Ocorreu um erro ao criar o site', {
					description: 'Esse subdomínio já está em uso'
				})
				return
			}

			const siteBuilder = new SiteEntityBuilder()

			const site = siteBuilder
				.withName(name)
				.withSubdomain(subdomain)
				.withDescription(description)
				.build()
				.toObject()

			const newSite = await createSite(site)

			if (isLeft(newSite)) {
				toast.error('Ocorreu um erro ao criar o site', {
					description: newSite.error.message
				})
				return
			}

			if (isRight(newSite)) {
				toast.success('Site criado com sucesso', {
					description: `O site ${newSite.value.data.name} foi criado com sucesso`
				})
			}
		})
	}

	return { isPending, create }
}
