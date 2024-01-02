import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { EditSiteSettingsData, EditSiteSettingsDTO } from '../dtos'

export const useEditSiteSettingsForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<Omit<EditSiteSettingsData, 'id'>>({
		resolver: zodResolver(
			EditSiteSettingsDTO.pick({ name: true, subdomain: true, description: true })
		)
	})

	return { register, handleSubmit, reset, errors }
}
