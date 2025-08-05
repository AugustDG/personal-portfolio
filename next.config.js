/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8055',
                pathname: '/assets/**',
            },
        ],
    },
    async rewrites() {
        const directusUrl = process.env.DIRECTUS_URL || 'http://localhost:8055';
        return [
            {
                source: "/assets/:path*",
                destination: `${directusUrl}/assets/:path*`,
            },
        ];
    },
    webpack: (config, { isServer }) => {
        // Fix for Node.js built-in modules
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                os: false,
                crypto: false,
                stream: false,
                assert: false,
                http: false,
                https: false,
                url: false,
                zlib: false,
                net: false,
                tls: false,
                child_process: false,
                dns: false,
                buffer: false,
            };
        }

        // Handle .mjs files
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
        });

        return config;
    },
};

module.exports = nextConfig;
