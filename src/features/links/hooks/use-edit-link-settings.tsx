import React from 'react'
import { useParams } from 'next/navigation'

import { toast } from 'sonner'

import { isLeft, isRight } from '@/libs/either'
import { createHttpClient } from '@/libs/network'

import { editLinkSettings, getLink } from '../actions'
import { EditLinkData, EditLinkDTO } from '../dtos'
import { LinkEntityBuilder } from '../entities/link'

export const useEditLinkSettings = () => {
	const http = createHttpClient({ baseURL: '/api' })
	const { id: linkId } = useParams() as { id: string }
	const [isPending, startTransition] = React.useTransition()

	const edit = async (data: EditLinkData) => {
		const parsedData = EditLinkDTO.safeParse(data)

		if (!parsedData.success) {
			toast.error('Ocorreu um erro ao editar o link', {
				description: parsedData.error.message
			})
			return
		}

		const { name, url, description } = parsedData.data

		startTransition(async () => {
			const linkExists = await getLink({ id: linkId })

			if (isLeft(linkExists)) {
				toast.error('Ocorreu um erro ao editar o link', {
					description: linkExists.error.message
				})
				return
			}

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

			const linkBuilder = new LinkEntityBuilder()

			const link = linkBuilder
				.withId(linkId)
				.withName(name)
				.withUrl(url)
				.withNsfw(isUrlUnsafe.value.data.block)
				.withDescription(description)
				.build()
				.toObject()

			const editedLink = await editLinkSettings(link)

			if (isLeft(editedLink)) {
				toast.error('Ocorreu um erro ao editar o link', {
					description: editedLink.error.message
				})
				return
			}

			if (isRight(editedLink)) {
				toast.success('Link editado com sucesso', {
					description: `O link ${editedLink.value.data.name} foi atualizado com sucesso`
				})
			}
		})
	}

	return { edit, isPending }
}
