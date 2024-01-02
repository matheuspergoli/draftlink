import { Skeleton } from '@/shared/ui/skeleton'

export const CardSitesSkeleton = () => {
	return (
		<div>
			<Skeleton className='h-8 w-full max-w-40' />
			<div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
				{Array.from({ length: 2 }).map((_, index) => (
					<div
						key={index}
						className='relative flex min-h-60 flex-col gap-3 rounded-xl border p-5'>
						<Skeleton className='absolute right-3 top-3 h-7 w-7 rounded-full' />
						<div className='flex flex-col gap-3'>
							<Skeleton className='mb-5 h-6 w-full max-w-40' />
							<Skeleton className='h-6 w-full max-w-60' />
							<Skeleton className='h-44 w-full' />
						</div>
						<div className='flex flex-col gap-3'>
							<Skeleton className='h-10' />
							<Skeleton className='h-10' />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
