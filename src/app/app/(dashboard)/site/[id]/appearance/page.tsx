import { notFound } from 'next/navigation'

import { getSite } from '@/features/site/actions'
import { EditSiteAppearanceForm } from '@/features/site/components/forms'
import { isLeft } from '@/libs/either'

export default async function Page({ params }: { params: { id: string } }) {
	const site = await getSite({ id: params.id })

	if (isLeft(site)) {
		notFound()
	}

	const { id, logo } = site.value.data

	return (
		<main className='container mx-auto my-10'>
			<EditSiteAppearanceForm id={id} logo={logo?.image as string} />
		</main>
	)
}
