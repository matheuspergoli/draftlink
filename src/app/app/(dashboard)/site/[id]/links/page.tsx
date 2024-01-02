import { Suspense } from 'react'

import { CardLinks } from '@/features/links/components/card-links'
import { CreateLinkDrawer } from '@/features/links/components/create-link-drawer'
import { CreateLinkModal } from '@/features/links/components/create-link-modal'
import { CardLinksSkeleton } from '@/features/links/components/skeleton'

export default function Page({ params }: { params: { id: string } }) {
	return (
		<main className='container mx-auto my-10'>
			<div className='mb-10 ml-auto w-fit'>
				<div className='hidden md:block'>
					<CreateLinkModal />
				</div>
				<div className='md:hidden'>
					<CreateLinkDrawer />
				</div>
			</div>
			<Suspense fallback={<CardLinksSkeleton />}>
				<CardLinks siteId={params.id} />
			</Suspense>
		</main>
	)
}
