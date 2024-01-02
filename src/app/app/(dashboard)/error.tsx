'use client'

import { Button } from '@/shared/ui/button'

interface ErrorProps {
	error: Error & { digest?: string }
	reset: () => void
}

export default function Error({ reset }: ErrorProps) {
	return (
		<main className='container mx-auto mt-20 flex flex-col items-center justify-center'>
			<div className='mb-5 flex flex-col items-center'>
				<h1 className='text-2xl font-bold'>Oops!</h1>
				<p className='text-xl'>Parece que você está fazendo requests demais</p>
			</div>

			<Button onClick={reset}>Tentar novamente</Button>
		</main>
	)
}
