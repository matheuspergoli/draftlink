import { PlusCircle } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/shared/ui/drawer'

import { CreateLinkForm } from '../forms'

export const CreateLinkDrawer = () => {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button className='gap-2'>
					<PlusCircle width={18} />
					Criar link
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<div className='mx-auto w-full max-w-96'>
						<DrawerTitle className='text-2xl font-bold'>Criar um novo link</DrawerTitle>
					</div>
				</DrawerHeader>
				<div className='mx-auto mb-5 w-full max-w-96'>
					<CreateLinkForm />
				</div>
			</DrawerContent>
		</Drawer>
	)
}
