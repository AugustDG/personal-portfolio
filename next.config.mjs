/** @type {import('next').NextConfig} */
const directusUrl = process.env.PUBLIC_DIRECTUS_URL;
let directusPattern = null;
try {
    if (directusUrl) {
        const u = new URL(directusUrl);
        directusPattern = { protocol: u.protocol.replace(':', ''), hostname: u.hostname };
    }
} catch {/* ignore malformed env */ }

const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**.augustopinheiro.com' },
            ...(directusPattern ? [directusPattern] : []),
        ],
    },
};

export default nextConfig;
