'use client'

import React from 'react'
import { useParams, useSelectedLayoutSegments } from 'next/navigation'

import { Layout, LayoutGrid, Link, LogOutIcon, Settings } from 'lucide-react'

import { ActiveLink } from '@/shared/components/active-link'
import { SignOutButton } from '@/shared/components/sign-out-button'
import { ThemeMode } from '@/shared/components/theme-mode'
import { Button } from '@/shared/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/shared/ui/sheet'

interface NavTab {
	name: string
	href: string
	icon: React.ReactNode
}

export const Navbar = ({ children }: { children: React.ReactNode }) => {
	const segments = useSelectedLayoutSegments()
	const { id } = useParams() as { id: string }

	const tabs = React.useMemo<NavTab[]>(() => {
		if (segments[0] === 'site' && id) {
			return [
				{
					name: 'Configurações',
					href: `/site/${id}/settings`,
					icon: <Settings width={18} />
				},
				{
					name: 'Aparência',
					href: `/site/${id}/appearance`,
					icon: <Layout width={18} />
				},
				{
					name: 'Links',
					href: `/site/${id}/links`,
					icon: <Link width={18} />
				},
				{
					name: 'Overview',
					href: '/',
					icon: <LayoutGrid width={18} />
				}
			]
		} else if (segments[0] === 'link') {
			return [
				{
					name: 'Configurações',
					href: `/link/${id}/settings`,
					icon: <Settings width={18} />
				},
				{
					name: 'Overview',
					href: '/',
					icon: <LayoutGrid width={18} />
				}
			]
		} else {
			return [
				{
					name: 'Overview',
					href: '/',
					icon: <LayoutGrid width={18} />
				}
			]
		}
	}, [segments, id])

	return (
		<nav className='border-b py-3'>
			<div className='container mx-auto flex items-center justify-between'>
				<div className='hidden items-center gap-5 md:flex'>
					{tabs.map((tab) => (
						<ActiveLink
							key={tab.href}
							href={tab.href}
							className='flex w-fit items-center gap-2'>
							{tab.icon}
							{tab.name}
						</ActiveLink>
					))}
				</div>

				<div className='flex items-center gap-3'>
					{children}
					<SignOutButton variant='ghost' className='bg-transparent'>
						<LogOutIcon />
					</SignOutButton>
					<ThemeMode />
				</div>

				<Sheet>
					<SheetTrigger asChild>
						<Button className='md:hidden'>Menu</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader className='mb-10'>
							<SheetTitle>DraftLink</SheetTitle>
						</SheetHeader>

						<div className='items-center gap-5'>
							{tabs.map((tab) => (
								<ActiveLink
									key={tab.href}
									href={tab.href}
									className='flex items-center gap-2'>
									{tab.icon}
									{tab.name}
								</ActiveLink>
							))}
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	)
}
