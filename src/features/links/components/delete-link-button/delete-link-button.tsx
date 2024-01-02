'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/libs/utils'
import { Button, buttonVariants } from '@/shared/ui/button'

import { deleteLink } from '../../actions'

interface DeleteLinkButtonProps extends React.PropsWithChildren {
	linkId: string
	className?: string
}

export const DeleteLinkButton = (props: DeleteLinkButtonProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const [isPending, startTransition] = React.useTransition()

	const handleDelete = () => {
		startTransition(async () => {
			await deleteLink({ id: props.linkId })
			if (!pathname.startsWith('/site')) {
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
