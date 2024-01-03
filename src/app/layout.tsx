import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'

import { SessionProvider } from '@/context/session-provider'
import { ThemeProvider } from '@/context/theme-provider'
import { env } from '@/environment/env'
import { Provider } from '@/provider'
import { Toaster } from '@/shared/ui/sonner'

const metadataBase = env.VERCEL_URL
	? new URL(`https://${env.NEXTAUTH_URL}`)
	: new URL(`http://${env.NEXTAUTH_URL}`)

export const metadata: Metadata = {
	title: 'DraftLink',
	description: 'Site para criação de Linktrees criado por Matheus Pergoli',
	openGraph: {
		title: 'DraftLink',
		description: 'Site para criação de Linktrees criado por Matheus Pergoli',
		images: [
			'https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/JRajRyC-PhBHEinQkupt02jqfKacBVHLWJq7Iy.png'
		],
		creators: ['DraftLink']
	},
	twitter: {
		card: 'summary_large_image',
		title: 'DraftLink',
		description: 'Site para criação de Linktrees criado por Matheus Pergoli',
		images: [
			'https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/JRajRyC-PhBHEinQkupt02jqfKacBVHLWJq7Iy.png'
		],
		creator: 'by DraftLink'
	},
	metadataBase
}

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-br' suppressHydrationWarning>
			<body>
				<Provider providers={[SessionProvider, ThemeProvider]}>{children}</Provider>
				<Toaster />
			</body>
		</html>
	)
}
