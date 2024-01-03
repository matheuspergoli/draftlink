import { env } from '@/environment/env'
import { cn, placeholderBlurhash } from '@/libs/utils'
import { BlurImage } from '@/shared/components/blur-image'
import { ThemeMode } from '@/shared/components/theme-mode'
import { Button, buttonVariants } from '@/shared/ui/button'

export default async function Page() {
	const isHttp = env.VERCEL_URL ? 'https://' : 'http://'
	const redirectLink = `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/login`

	return (
		<>
			<header className='mb-40 border-b'>
				<nav className='container mx-auto flex h-14 items-center justify-between'>
					<ThemeMode />
					<ul className='flex gap-3'>
						<li>
							<a
								href='https://github.com/matheuspergoli/draftlink'
								target='_blank'
								rel='noopener noreferrer'
								className={cn(buttonVariants({ variant: 'outline' }), 'font-semibold')}>
								Repositório
							</a>
						</li>
						<li>
							<a
								href='https://github.com/matheuspergoli'
								target='_blank'
								rel='noopener noreferrer'
								className={cn(buttonVariants({ variant: 'outline' }), 'font-semibold')}>
								Matheus Pergoli
							</a>
						</li>
					</ul>
				</nav>
			</header>

			<main className='container mx-auto flex flex-col items-center justify-center gap-10'>
				<section className='space-y-2 text-center'>
					<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
						Next.js 14 Template
					</h1>
					<p className='text-gray-500 md:text-xl'>
						Projeto foi feito utilizando o template para Next.js 14 criado por Matheus
						Pergoli.
					</p>
					<p className='text-gray-500 md:text-xl'>
						Esse template foi criado para o uso pessoal mas é gratuito para qualquer um
						usar.
					</p>
				</section>

				<section>
					<Button asChild>
						<a href={`${isHttp}${redirectLink}`} target='_blank' rel='noreferrer'>
							Ir para o site
						</a>
					</Button>
				</section>

				<figure className='overflow-hidden rounded-lg'>
					<BlurImage
						width={400}
						height={400}
						alt='Blurhash'
						src={'https://avatars.githubusercontent.com/u/14985020?v=4'}
						placeholder='blur'
						blurDataURL={placeholderBlurhash}
						className='w-60 rounded-lg'
					/>
				</figure>
			</main>
		</>
	)
}
