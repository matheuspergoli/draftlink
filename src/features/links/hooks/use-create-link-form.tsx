import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { CreateLinkData, CreateLinkDTO } from '../dtos'

export const useCreateLinkForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<CreateLinkData>({
		resolver: zodResolver(CreateLinkDTO)
	})

	return { register, handleSubmit, reset, errors }
}
