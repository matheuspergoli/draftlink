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

import { EditSiteSettingsData } from '../../dtos'
import { useEditSiteSettings, useEditSiteSettingsForm } from '../../hooks'
import { DeleteSiteButton } from '../delete-site-button'

interface SiteDefaultValue {
	id: string
	name: string
	description: string
	subdomain: string
}

export const EditSiteSettingsForm = (props: SiteDefaultValue) => {
	const { edit: editSite, isPending } = useEditSiteSettings()
	const { register, errors, handleSubmit } = useEditSiteSettingsForm()

	const onSubmit = async (data: Omit<EditSiteSettingsData, 'id'>) => {
		await editSite({ id: props.id, ...data })
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
			<FormButton className='ml-auto w-fit gap-2' disabled={isPending}>
				<BadgeCheck width={18} />
				{isPending ? 'Salvando...' : 'Salvar'}
			</FormButton>
			<FormGroup className='flex flex-col gap-3 rounded-md border p-5'>
				<FormLabel className='text-2xl'>Nome</FormLabel>
				<p className='text-gray-500'>
					O nome do seu site. Isso será usado como o título do seu site no google.
				</p>
				<FormInput defaultValue={props.name} {...register('name')} />
				{errors.name && <span className='text-red-500'>{errors.name.message}</span>}
			</FormGroup>

			<FormGroup className='flex flex-col gap-3 rounded-md border p-5'>
				<FormLabel className='text-2xl'>Descrição</FormLabel>
				<p className='text-gray-500'>
					A descrição do seu site. Isso será usado como a descrição do seu site no google.
				</p>
				<FormTextarea defaultValue={props.description} {...register('description')} />
				{errors.description && (
					<span className='text-red-500'>{errors.description.message}</span>
				)}
			</FormGroup>

			<FormGroup className='flex flex-col gap-3 rounded-md border p-5'>
				<FormLabel className='text-2xl'>Subdomínio</FormLabel>
				<p className='text-gray-500'>
					O subdomínio do seu site. Isso será usado como o subdomínio do seu site no
					google.
				</p>
				<FormInput defaultValue={props.subdomain} {...register('subdomain')} />
				{errors.subdomain && (
					<span className='text-red-500'>{errors.subdomain.message}</span>
				)}
			</FormGroup>

			<FormGroup className='flex flex-col gap-3 rounded-md border border-red-600 p-5'>
				<FormLabel className='text-2xl'>Apagar Site</FormLabel>
				<p className='text-gray-500'>
					Você está prestes a deletar seu site ({props.name}).
				</p>
				<p className='font-bold text-red-600'>(Essa é uma ação irreversível!)</p>
				<DeleteSiteButton className='w-fit bg-red-600' siteId={props.id}>
					Apagar
				</DeleteSiteButton>
			</FormGroup>
		</Form>
	)
}
