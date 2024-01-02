'use client'

import { BadgeCheck } from 'lucide-react'

import { Form, FormButton, FormGroup, FormInput, FormLabel } from '@/components/form'
import { placeholderBlurhash } from '@/libs/utils'
import { BlurImage } from '@/shared/components/blur-image'

import { useEditSiteAppearance, useEditSiteAppearanceForm } from '../../hooks'

interface SiteDefaultValue {
	id: string
	logo: string
}

export const EditSiteAppearanceForm = (props: SiteDefaultValue) => {
	const { edit: editSite, isPending } = useEditSiteAppearance()
	const { register, handleSubmit, watch } = useEditSiteAppearanceForm()

	const watchLogo = watch('logo')

	const onSubmit = async () => {
		const formData = new FormData()
		formData.append('file', watchLogo?.[0])

		await editSite({
			id: props.id,
			logoFormData: formData
		})
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
			<FormButton className='ml-auto w-fit gap-2' disabled={isPending}>
				<BadgeCheck width={18} />
				{isPending ? 'Salvando...' : 'Salvar'}
			</FormButton>

			<FormGroup className='flex flex-col gap-3 rounded-md border p-5'>
				<FormLabel className='text-2xl'>Logo</FormLabel>
				<p className='text-gray-500'>
					A imagem de logo para o seu site. Clique na imagem para alterá-la.
				</p>
				<FormLabel
					htmlFor='logo'
					className='block w-full max-w-xs overflow-hidden rounded-md border'>
					<BlurImage
						src={watchLogo?.[0] ? URL.createObjectURL(watchLogo?.[0]) : props.logo}
						alt='Logo'
						width={500}
						height={500}
						placeholder='blur'
						className='aspect-square h-full w-full rounded-md object-cover'
						blurDataURL={placeholderBlurhash}
					/>
					<FormInput id='logo' type='file' className='hidden' {...register('logo')} />
				</FormLabel>
			</FormGroup>
		</Form>
	)
}
