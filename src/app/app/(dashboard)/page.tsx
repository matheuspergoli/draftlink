import { Suspense } from 'react'

import { CardSites } from '@/features/site/components/card-sites'
import { CreateSiteDrawer } from '@/features/site/components/create-site-drawer'
import { CreateSiteModal } from '@/features/site/components/create-site-modal'
import { CardSitesSkeleton } from '@/features/site/components/skeleton'

export default function Page() {
	return (
		<main className='container mx-auto my-10'>
			<div className='mb-10 ml-auto w-fit'>
				<div className='hidden md:block'>
					<CreateSiteModal />
				</div>
				<div className='md:hidden'>
					<CreateSiteDrawer />
				</div>
			</div>
			<Suspense fallback={<CardSitesSkeleton />}>
				<CardSites />
			</Suspense>
		</main>
	)
}
