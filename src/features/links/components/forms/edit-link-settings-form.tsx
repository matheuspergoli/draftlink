'use client'

import { BadgeCheck } from 'lucide-react'

import {
	Form,
	FormButton,
	FormGroup,
	FormInput,
	FormLabel,
	FormTextarea
} from '@/components/form'

import { CreateLinkData } from '../../dtos'
import { useEditLinkSettings, useEditLinkSettingsForm } from '../../hooks'
import { DeleteLinkButton } from '../delete-link-button'

interface LinkDefaultValue {
	id: string
	name: string
	description: string
	url: string
}

export const EditLinkSettingsForm = (props: LinkDefaultValue) => {
	const { edit: editLink, isPending } = useEditLinkSettings()
	const { register, errors, handleSubmit } = useEditLinkSettingsForm()

	const onSubmit = async (data: CreateLinkData) => {
		await editLink({ ...data })
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
			<FormButton className='ml-auto w-fit gap-2' disabled={isPending}>
				<BadgeCheck width={18} />
				{isPending ? 'Editando...' : 'Editar'}
			</FormButton>
			<FormGroup className='flex flex-col gap-3 rounded-md border p-5'>
				<FormLabel className='text-2xl'>Nome</FormLabel>
				<p className='text-gray-500'>
					O nome do seu link. Isso será usado como o título do seu link no google.
				</p>
				<FormInput defaultValue={props.name} {...register('name')} />
				{errors.name && <span className='text-red-500'>{errors.name.message}</span>}
			</FormGroup>

			<FormGroup className='flex flex-col gap-3 rounded-md border p-5'>
				<FormLabel className='text-2xl'>Descrição</FormLabel>
				<p className='text-gray-500'>
					A descrição do seu link. Isso será usado como a descrição do seu link no google.
				</p>
				<FormTextarea defaultValue={props.description} {...register('description')} />
				{errors.description && (
					<span className='text-red-500'>{errors.description.message}</span>
				)}
			</FormGroup>

			<FormGroup className='flex flex-col gap-3 rounded-md border p-5'>
				<FormLabel className='text-2xl'>Endereço</FormLabel>
				<p className='text-gray-500'>
					O endereço do seu link. Isso será usado como o endereço do seu link no google.
				</p>
				<FormInput defaultValue={props.url} {...register('url')} />
				{errors.url && <span className='text-red-500'>{errors.url.message}</span>}
			</FormGroup>

			<FormGroup className='flex flex-col gap-3 rounded-md border border-red-600 p-5'>
				<FormLabel className='text-2xl'>Apagar Link</FormLabel>
				<p className='text-gray-500'>
					Você está prestes a deletar seu link ({props.name}).
				</p>
				<p className='font-bold text-red-600'>(Essa é uma ação irreversível!)</p>
				<DeleteLinkButton className='w-fit bg-red-600' linkId={props.id}>
					Apagar
				</DeleteLinkButton>
			</FormGroup>
		</Form>
	)
}
