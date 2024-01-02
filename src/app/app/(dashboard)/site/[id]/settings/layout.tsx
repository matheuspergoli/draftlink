import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Site | Configurações'
}

interface SettingsLayoutProps {
	children: React.ReactNode
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
	return <>{children}</>
}
