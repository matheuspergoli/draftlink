import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { CreateSiteData, CreateSiteDTO } from '../dtos'

export const useCreateSiteForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors }
	} = useForm<CreateSiteData>({
		resolver: zodResolver(CreateSiteDTO)
	})

	const nameInput = watch('name')

	React.useEffect(() => {
		setValue(
			'subdomain',
			nameInput
				?.toLowerCase()
				.trim()
				.replace(/[\W_]+/g, '-')
		)
	}, [nameInput, setValue])

	return { register, handleSubmit, reset, errors }
}
