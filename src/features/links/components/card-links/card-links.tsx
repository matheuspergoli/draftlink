import Link from 'next/link'

import { Settings } from 'lucide-react'

import { isRight } from '@/libs/either'
import { Button } from '@/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/ui/card'

import { getSiteLinks } from '../../actions'
import { DeleteLinkButton } from '../delete-link-button'

interface CardLinksProps {
	siteId: string
}

export const CardLinks = async (props: CardLinksProps) => {
	const links = await getSiteLinks({ siteId: props.siteId })

	return (
		<>
			{isRight(links) && links.value.data.length > 0 && (
				<h3 className='mb-10 text-2xl font-semibold'>
					Seus links: {links.value.data.length} / 6
				</h3>
			)}

			{isRight(links) && (
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
					{links.value.data.length === 0 && (
						<div className='col-span-3'>
							<p className='text-center text-xl font-semibold'>
								Você ainda não criou links para esse site
							</p>
						</div>
					)}

					{links.value.data.map((link) => (
						<Card key={link.id} className='relative'>
							<CardHeader>
								<Link
									href={`/link/${link.id}/settings`}
									className='absolute right-3 top-3'>
									<Settings width={24} />
								</Link>
								<CardTitle className='truncate text-2xl'>{link.name}</CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col gap-3'>
								<CardDescription className='truncate'>{link.description}</CardDescription>
							</CardContent>
							<CardFooter className='flex flex-col items-center justify-between gap-3'>
								<Button asChild className='w-full'>
									<a target='_blank' href={link.url} rel='noreferrer'>
										Ir para o link
									</a>
								</Button>
								<DeleteLinkButton linkId={link.id} className='w-full'>
									Deletar link
								</DeleteLinkButton>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</>
	)
}
