/**
 * @type {import('next').NextConfig}
 */

const webpack = require("webpack");

const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    console.log(percentage, message, ...args);
};

const nextConfig = {
    images: {
        domains: [
            "minio-dc-s3.digitalcopilote.re",
            "minio-cloud-s3.jidayyy.com",
        ],
    },
    webpack: (config) => {
        config.plugins.push(new webpack.ProgressPlugin(handler));

        return config;
    },
};

module.exports = nextConfig;
