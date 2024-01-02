/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'illustrations.popsy.co'
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com'
			}
		]
	}
}

module.exports = nextConfig
