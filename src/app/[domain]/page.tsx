import { notFound } from 'next/navigation'

import { LinkTooltip } from '@/components/link-tooltip'
import { env } from '@/environment/env'
import { getLinks } from '@/features/links/actions'
import { getSite } from '@/features/site/actions'
import { isLeft, isRight } from '@/libs/either'
import { placeholderBlurhash } from '@/libs/utils'
import { BlurImage } from '@/shared/components/blur-image'
import { ThemeMode } from '@/shared/components/theme-mode'
import { Button } from '@/shared/ui/button'

export default async function Page({ params }: { params: { domain: string } }) {
	const domain = decodeURIComponent(params.domain)
	const url = domain.split('.')[0]
	const site = await getSite({ subdomain: url })

	if (isLeft(site)) {
		return notFound()
	}

	const links = await getLinks({ siteId: site.value.data.id })

	const isHttp = env.VERCEL_URL ? 'https://' : 'http://'
	const redirectLink = `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/login`

	return (
		<main className='flex h-screen flex-col'>
			<div className='container mx-auto my-10 w-fit'>
				<ThemeMode />
			</div>
			<div className='container mx-auto mb-10 flex-1'>
				<figure className='mx-auto aspect-square h-44 w-44 overflow-hidden rounded-full border'>
					<BlurImage
						src={site.value.data.logo?.image as string}
						alt='Logo'
						width={500}
						height={500}
						placeholder='blur'
						className='h-full w-full rounded-md object-cover'
						blurDataURL={placeholderBlurhash}
					/>
				</figure>

				<article>
					<section className='mt-1 text-center tracking-tighter'>
						<h1 className='text-4xl font-bold'>{site.value.data.name}</h1>
						<p className='text-gray-500'>{site.value.data.description}</p>
					</section>

					{isRight(links) ? (
						<section className='mx-auto mt-10 grid w-full max-w-80 grid-cols-1 gap-5'>
							{links.value.data.map((link) => (
								<LinkTooltip key={link.id} {...link} />
							))}
						</section>
					) : null}
				</article>
			</div>

			<footer className='border-t'>
				<section className='container mx-auto flex flex-wrap items-center justify-center gap-5 py-5 sm:justify-between'>
					<Button asChild variant='outline'>
						<a href={`${isHttp}${redirectLink}`} target='_blank' rel='noreferrer'>
							Crie a sua DraftLink
						</a>
					</Button>

					<p className='text-center text-gray-500'>
						DraftLink by Matheus Pergoli © {new Date().getFullYear()}
					</p>
				</section>
			</footer>
		</main>
	)
}
