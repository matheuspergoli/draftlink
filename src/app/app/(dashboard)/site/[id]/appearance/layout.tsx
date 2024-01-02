import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Site | Aparência'
}

interface AppearanceLayoutProps {
	children: React.ReactNode
}

export default async function AppearanceLayout({ children }: AppearanceLayoutProps) {
	return <>{children}</>
}
