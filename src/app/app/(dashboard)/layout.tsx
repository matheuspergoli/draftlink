import { Metadata } from 'next'

import { Navbar } from '@/components/navbar'
import { Profile } from '@/components/profile'

export const metadata: Metadata = {
	title: 'Dashboard | Overview'
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar>
				<Profile />
			</Navbar>
			{children}
		</>
	)
}
