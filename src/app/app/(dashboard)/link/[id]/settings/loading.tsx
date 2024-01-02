import { Skeleton } from '@/shared/ui/skeleton'

export default function Loading() {
	return (
		<div className='container mx-auto my-10'>
			<Skeleton className='mb-5 ml-auto h-9 w-full max-w-28 rounded-md px-4 py-2' />
			<div className='flex flex-col gap-5'>
				<div className='flex flex-col gap-3 rounded-md border p-5'>
					<Skeleton className='h-8 w-full max-w-24' />
					<Skeleton className='h-8 w-full max-w-80' />
					<Skeleton className='h-8 w-full' />
				</div>
				<div className='flex flex-col gap-3 rounded-md border p-5'>
					<Skeleton className='h-8 w-full max-w-24' />
					<Skeleton className='h-8 w-full max-w-80' />
					<Skeleton className='h-14 w-full' />
				</div>
				<div className='flex flex-col gap-3 rounded-md border p-5'>
					<Skeleton className='h-8 w-full max-w-36' />
					<Skeleton className='h-8 w-full max-w-96' />
					<Skeleton className='h-8 w-full' />
				</div>
				<div className='flex flex-col gap-3 rounded-md border p-5'>
					<Skeleton className='h-8 w-full max-w-36' />
					<Skeleton className='h-8 w-full max-w-80' />
					<Skeleton className='h-8 w-full max-w-60' />
					<Skeleton className='h-9 w-full max-w-28' />
				</div>
			</div>
		</div>
	)
}
