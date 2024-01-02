import { PlusCircle } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui/dialog'

import { CreateLinkForm } from '../forms/create-link-form'

export const CreateLinkModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='ml-auto gap-2'>
					<PlusCircle width={18} />
					Criar link
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold'>Criar um novo link</DialogTitle>
				</DialogHeader>
				<CreateLinkForm />
			</DialogContent>
		</Dialog>
	)
}
