/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'augustopinheiro.com' },
            { protocol: 'https', hostname: '**.directus.app' },
            { protocol: 'https', hostname: 'assets.directus.io' }
        ]
    },
};

export default nextConfig;
