import Link from 'next/link'

import { Settings } from 'lucide-react'

import { isRight } from '@/libs/either'
import { formatSubdomainURL, placeholderBlurhash } from '@/libs/utils'
import { BlurImage } from '@/shared/components/blur-image'
import { Button } from '@/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/ui/card'

import { getUserSites } from '../../actions'
import { DeleteSiteButton } from '../delete-site-button'

export const CardSites = async () => {
	const sites = await getUserSites()

	return (
		<>
			{isRight(sites) && sites.value.data.length > 0 && (
				<h3 className='mb-10 text-2xl font-semibold'>
					Seus sites: {sites.value.data.length} / 6
				</h3>
			)}

			{isRight(sites) && (
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
					{sites.value.data.length === 0 && (
						<div className='col-span-3'>
							<p className='text-center text-xl font-semibold'>Você não tem sites</p>
						</div>
					)}

					{sites.value.data.map((site) => (
						<Card key={site.id} className='relative'>
							<CardHeader>
								<Link
									href={`/site/${site.id}/settings`}
									className='absolute right-3 top-3'>
									<Settings width={24} />
								</Link>
								<CardTitle className='truncate text-2xl'>{site.name}</CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col gap-3'>
								<CardDescription className='truncate'>{site.description}</CardDescription>
								<figure className='h-44 overflow-hidden rounded-md border'>
									<BlurImage
										src={site.logo?.image as string}
										alt='Logo'
										width={500}
										height={500}
										placeholder='blur'
										className='h-full w-full rounded-md object-cover'
										blurDataURL={placeholderBlurhash}
									/>
								</figure>
							</CardContent>
							<CardFooter className='flex flex-col items-center justify-between gap-3'>
								<Button asChild className='w-full'>
									<a
										target='_blank'
										href={formatSubdomainURL(site.subdomain as string)}
										rel='noreferrer'>
										Ir para o site
									</a>
								</Button>
								<Button asChild className='w-full'>
									<Link href={`/site/${site.id}/links`}>Ver links</Link>
								</Button>
								<DeleteSiteButton siteId={site.id} className='w-full'>
									Deletar site
								</DeleteSiteButton>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</>
	)
}
