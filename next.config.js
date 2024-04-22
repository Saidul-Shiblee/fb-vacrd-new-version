/** @type {import('next').NextConfig} */

const nextConfig = {

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        return config;
    }


}

module.exports = nextConfig
