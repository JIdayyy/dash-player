const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    images: {
        domains: ["minio-dc-s3.digitalcopilote.re"],
    },
});
