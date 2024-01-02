import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'

import { SessionProvider } from '@/context/session-provider'
import { ThemeProvider } from '@/context/theme-provider'
import { Provider } from '@/provider'
import { Toaster } from '@/shared/ui/sonner'

export const metadata: Metadata = {
	title: 'DraftLink',
	description: 'Created by Matheus Pergoli'
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
