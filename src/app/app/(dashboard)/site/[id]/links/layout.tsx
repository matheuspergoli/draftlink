import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Site | Links'
}

interface LinksLayoutProps {
	children: React.ReactNode
}

export default async function LinksLayout({ children }: LinksLayoutProps) {
	return <>{children}</>
}
