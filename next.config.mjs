/** @type {import('next').NextConfig} */
const nextConfig = {}
  

/*  FOR PDF VIEWER - NOT TESTED
    experimental: {
      appDir: true,
    },
    future: { webpack5: true },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
    }
  */
export default nextConfig;