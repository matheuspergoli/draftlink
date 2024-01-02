'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/libs/utils'
import { Button, buttonVariants } from '@/shared/ui/button'

import { deleteSite } from '../../actions'

interface DeleteSiteButtonProps extends React.PropsWithChildren {
	siteId: string
	className?: string
}

export const DeleteSiteButton = (props: DeleteSiteButtonProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const [isPending, startTransition] = React.useTransition()

	const handleDelete = () => {
		startTransition(async () => {
			await deleteSite({ id: props.siteId })
			if (pathname.startsWith('/site')) {
				router.push('/')
			}
		})
	}

	return (
		<Button
			onClick={handleDelete}
			disabled={isPending}
			className={cn(buttonVariants(), props.className)}>
			{isPending ? 'Deletando...' : props.children}
		</Button>
	)
}
