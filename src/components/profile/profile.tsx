import { getSession } from '@/libs/auth'
import { placeholderBlurhash } from '@/libs/utils'
import { BlurImage } from '@/shared/components/blur-image'

export const Profile = async () => {
	const session = await getSession()

	return (
		<figure className='h-10 w-10 overflow-hidden rounded-full'>
			<BlurImage
				width={100}
				height={100}
				alt='Blurhash'
				src={
					session?.user.image ??
					'https://placehold.co/500x500/png?text=Profile&font=roboto'
				}
				placeholder='blur'
				blurDataURL={placeholderBlurhash}
				className='h-10 w-10 rounded-full object-cover'
			/>
		</figure>
	)
}
