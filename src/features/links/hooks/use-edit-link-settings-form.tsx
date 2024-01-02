import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { EditLinkData, EditLinkDTO } from '../dtos'

export const useEditLinkSettingsForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<EditLinkData>({
		resolver: zodResolver(EditLinkDTO)
	})

	return { register, handleSubmit, errors }
}
