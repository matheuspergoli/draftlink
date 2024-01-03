'use client'

import {
	Form,
	FormButton,
	FormGroup,
	FormInput,
	FormLabel,
	FormTextarea
} from '@/components/form'

import { CreateSiteData } from '../../dtos'
import { useCreateSite, useCreateSiteForm } from '../../hooks'

export const CreateSiteForm = () => {
	const { create: createSite, isPending } = useCreateSite()
	const { register, handleSubmit, errors } = useCreateSiteForm()

	const onSubmit = async (data: CreateSiteData) => {
		await createSite(data)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className='grid grid-cols-2 gap-4'>
				<FormGroup>
					<FormLabel htmlFor='name'>Nome</FormLabel>
					<FormInput
						type='text'
						id='name'
						placeholder='Nome do site'
						{...register('name')}
					/>
					{errors.name && <span className='text-red-500'>{errors.name.message}</span>}
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor='subdomain'>Subdomínio</FormLabel>
					<FormInput
						type='text'
						id='subdomain'
						placeholder='Subdomínio do site'
						{...register('subdomain')}
					/>
					{errors.subdomain && (
						<span className='text-red-500'>{errors.subdomain.message}</span>
					)}
				</FormGroup>
				<FormGroup className='col-span-2'>
					<FormLabel htmlFor='description'>Descrição</FormLabel>
					<FormTextarea
						id='description'
						placeholder='Descrição do site'
						{...register('description')}
					/>
					{errors.description && (
						<span className='text-red-500'>{errors.description.message}</span>
					)}
				</FormGroup>
			</div>
			<FormGroup className='mt-4 flex justify-end'>
				<FormButton type='submit' disabled={isPending}>
					{isPending ? 'Criando...' : 'Criar site'}
				</FormButton>
			</FormGroup>
		</Form>
	)
}
