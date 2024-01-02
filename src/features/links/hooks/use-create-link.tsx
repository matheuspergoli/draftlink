import React from 'react'
import { useParams } from 'next/navigation'

import { toast } from 'sonner'

import { isLeft, isRight } from '@/libs/either'
import { createHttpClient } from '@/libs/network'

import { createLink } from '../actions'
import { CreateLinkData, CreateLinkDTO } from '../dtos'
import { LinkEntityBuilder } from '../entities/link'

export const useCreateLink = () => {
	const http = createHttpClient({ baseURL: '/api' })
	const { id: siteId } = useParams() as { id: string }
	const [isPending, startTransition] = React.useTransition()

	const create = async (data: CreateLinkData) => {
		const parsedData = CreateLinkDTO.safeParse(data)

		if (!parsedData.success) {
			toast.error('Ocorreu um erro ao criar o link', {
				description: parsedData.error.message
			})
			return
		}

		const { name, url, description } = parsedData.data

		startTransition(async () => {
			const linkBuilder = new LinkEntityBuilder()

			const isUrlUnsafe = await http.post<{ block: boolean }>({
				url: '/check-link',
				data: { url }
			})

			if (isLeft(isUrlUnsafe)) {
				toast.error('Ocorreu um erro ao editar o link', {
					description: 'Não foi possível verificar se o link é seguro'
				})
				return
			}

			const link = linkBuilder
				.withName(name)
				.withUrl(url)
				.withDescription(description)
				.withNsfw(isUrlUnsafe.value.data.block)
				.build()
				.toObject()

			const newLink = await createLink({
				siteId,
				id: link.id,
				url: link.url,
				name: link.name,
				nsfw: link.nsfw,
				description: link.description
			})

			if (isLeft(newLink)) {
				toast.error('Ocorreu um erro ao criar o link', {
					description: newLink.error.message
				})
				return
			}

			if (isRight(newLink)) {
				toast.success('Link criado com sucesso', {
					description: `O link ${newLink.value.data.name} foi criado com sucesso`
				})
			}
		})
	}

	return { isPending, create }
}
