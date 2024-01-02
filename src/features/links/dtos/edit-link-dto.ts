import { z } from 'zod'

export const EditLinkDTO = z.object({
	name: z
		.string()
		.min(3, 'Nome do link deve ter no mínimo 3 caracteres')
		.max(32, 'Nome do link deve ter no máximo 32 caracteres'),
	description: z
		.string()
		.min(3, 'Descrição do link deve ter no mínimo 3 caracteres')
		.max(140, 'Descrição do link deve ter no máximo 140 caracteres'),
	url: z
		.string()
		.url({ message: 'URL do link deve ser válida' })
		.max(140, 'URL do link deve ter no máximo 60 caracteres')
		.regex(
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%+.~#?&//=]*)/,
			{
				message: 'URL do link deve ser válida'
			}
		)
})

export type EditLinkData = z.infer<typeof EditLinkDTO>
