'use client'

import {
	Form,
	FormButton,
	FormGroup,
	FormInput,
	FormLabel,
	FormTextarea
} from '@/components/form'

import { CreateLinkData } from '../../dtos'
import { useCreateLink, useCreateLinkForm } from '../../hooks'

export const CreateLinkForm = () => {
	const { create: createLink, isPending } = useCreateLink()
	const { register, handleSubmit, errors } = useCreateLinkForm()

	const onSubmit = async (data: CreateLinkData) => {
		await createLink(data)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className='grid grid-cols-2 gap-4'>
				<FormGroup>
					<FormLabel htmlFor='name'>Nome</FormLabel>
					<FormInput
						type='text'
						id='name'
						placeholder='Nome do link'
						{...register('name')}
					/>
					{errors.name && <span className='text-red-500'>{errors.name.message}</span>}
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor='url'>Endereço</FormLabel>
					<FormInput
						type='text'
						id='url'
						placeholder='Endereço do link'
						{...register('url')}
					/>
					{errors.url && <span className='text-red-500'>{errors.url.message}</span>}
				</FormGroup>
				<FormGroup className='col-span-2'>
					<FormLabel htmlFor='description'>Descrição</FormLabel>
					<FormTextarea
						id='description'
						placeholder='Descrição do link'
						{...register('description')}
					/>
					{errors.description && (
						<span className='text-red-500'>{errors.description.message}</span>
					)}
				</FormGroup>
			</div>
			<FormGroup className='mt-4 flex justify-end'>
				<FormButton type='submit' disabled={isPending}>
					{isPending ? 'Criando...' : 'Criar link'}
				</FormButton>
			</FormGroup>
		</Form>
	)
}
