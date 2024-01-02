import { Metadata } from 'next'

import { env } from '@/environment/env'
import { getSite } from '@/features/site/actions'
import { isLeft } from '@/libs/either'

export async function generateMetadata({
	params
}: {
	params: { domain: string }
}): Promise<Metadata | null> {
	const domain = decodeURIComponent(params.domain)
	const site = await getSite({ subdomain: domain.split('.')[0] })

	if (isLeft(site)) {
		return null
	}

	const { name, description, logo } = site.value.data

	const metadataBase = env.VERCEL_URL
		? new URL(`https://${domain}`)
		: new URL(`http://${domain}`)

	return {
		title: name,
		description,
		openGraph: {
			title: name,
			description,
			images: [logo?.image as string],
			creators: ['DraftLink']
		},
		twitter: {
			card: 'summary_large_image',
			title: name,
			description,
			images: [logo?.image as string],
			creator: 'by DraftLink'
		},
		icons: [logo?.image as string],
		metadataBase
	}
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
