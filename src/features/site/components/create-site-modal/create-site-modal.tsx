import { PlusCircle } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui/dialog'

import { CreateSiteForm } from '../forms/create-site-form'

export const CreateSiteModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='gap-2'>
					<PlusCircle width={18} />
					Criar site
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold'>Criar um novo site</DialogTitle>
				</DialogHeader>
				<CreateSiteForm />
			</DialogContent>
		</Dialog>
	)
}
