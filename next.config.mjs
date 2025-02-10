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
    }
};

export default nextConfig;
