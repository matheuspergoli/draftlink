import { Button } from '@/shared/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/shared/ui/tooltip'

import { NsfwDialog } from '../nsfw-dialog'

interface LinkProps {
	name: string
	url: string
	nsfw: boolean
	description: string
}

export function LinkTooltip(props: LinkProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					{props.nsfw ? (
						<NsfwDialog url={props.url}>
							<Button variant='outline'>{props.name}</Button>
						</NsfwDialog>
					) : (
						<Button asChild variant='outline'>
							<a href={props.url} target='_blank' rel='noreferrer'>
								{props.name}
							</a>
						</Button>
					)}
				</TooltipTrigger>
				<TooltipContent>
					<p>{props.description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
