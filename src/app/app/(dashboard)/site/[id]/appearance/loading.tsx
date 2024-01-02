import { Skeleton } from '@/shared/ui/skeleton'

export default function Loading() {
	return (
		<div className='container mx-auto my-10'>
			<Skeleton className='mb-5 ml-auto h-9 w-full max-w-28 rounded-md px-4 py-2' />
			<div className='flex flex-col gap-3 rounded-md border p-5'>
				<Skeleton className='h-8 w-full max-w-24' />
				<Skeleton className='h-8 w-full max-w-96' />
				<Skeleton className='h-80 w-full max-w-xs' />
			</div>
		</div>
	)
}
