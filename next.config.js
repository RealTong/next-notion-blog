/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en-US", "zh-CN", "zh-TW"],
        defaultLocale: "en-US",
        localeDetection: false,
    },
    images: {
        remotePatterns: [
            {
                hostname: "s3.us-west-2.amazonaws.com",
            }
        ]
    },
    experimental: {
        serverComponentsExternalPackages: ['shiki']
    }
}
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
