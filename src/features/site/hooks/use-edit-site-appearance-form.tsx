import { useForm } from 'react-hook-form'

export const useEditSiteAppearanceForm = () => {
	const { register, handleSubmit, watch } = useForm()

	return { register, handleSubmit, watch }
}
