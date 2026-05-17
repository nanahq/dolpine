/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nana-ng.s3.af-south-1.amazonaws.com',
                port: ''
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/.well-known/apple-app-site-association',
                headers: [{ key: 'Content-Type', value: 'application/json' }],
            },
        ];
    },
};

export default nextConfig;
