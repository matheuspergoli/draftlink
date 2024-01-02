'use server'

import { v2 as cloudinary } from 'cloudinary'

import { env } from '@/environment/env'

cloudinary.config({
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
	cloud_name: env.CLOUDINARY_CLOUD_NAME
})

export const uploadToCloudinary = async ({ formData }: { formData: FormData }) => {
	const file = formData.get('file') as File

	if (!file) {
		return { error: 'No file found' }
	}

	const arr = await file.arrayBuffer()
	const buffer = Buffer.from(arr).toString('base64')
	const fileBase64 = `data:${file.type};base64,${buffer}`

	const result = await cloudinary.uploader.upload(fileBase64, {
		folder: 'draftlink-images',
		format: 'webp',
		transformation: {
			quality: 100
		}
	})

	return { url: result.secure_url, publicId: result.public_id }
}

export const deleteFromCloudinary = async ({ publicId }: { publicId: string }) => {
	await cloudinary.uploader.destroy(publicId, (error, result) => {
		if (error) {
			console.log(error)
		} else {
			console.log(result)
		}
	})
}
