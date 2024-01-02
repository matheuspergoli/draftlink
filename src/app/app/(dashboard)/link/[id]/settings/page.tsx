import { notFound } from 'next/navigation'

import { getLink } from '@/features/links/actions'
import { EditLinkSettingsForm } from '@/features/links/components/forms'
import { isLeft } from '@/libs/either'

export default async function Page({ params }: { params: { id: string } }) {
	const link = await getLink({ id: params.id })

	if (isLeft(link)) {
		notFound()
	}
	return (
		<main className='container mx-auto my-10'>
			<EditLinkSettingsForm {...link.value.data} />
		</main>
	)
}
