import { GithubIcon, Lock as LockIcon } from 'lucide-react'

import { SignInButton } from '@/shared/components/sign-in-button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/shared/ui/card'

export default function Page() {
	return (
		<main className='container mx-auto flex h-screen flex-col items-center justify-center'>
			<Card className='w-full max-w-96'>
				<CardHeader>
					<div className='mx-auto mb-5 w-fit rounded-full border border-white p-3'>
						<LockIcon width={45} height={45} />
					</div>
					<CardTitle className='text-center text-4xl font-bold tracking-tighter'>
						DraftLink
					</CardTitle>
					<CardDescription className='text-center'>
						Crie e gerencie todos os seus links em um único lugar
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SignInButton className='w-full'>
						<GithubIcon size={24} />
						<span className='ml-2'>Entrar com o Github</span>
					</SignInButton>
				</CardContent>
			</Card>
		</main>
	)
}
