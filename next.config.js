/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const path = require('path');

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	i18n,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: [ '127.0.0.1', 'arweave.net', 'api.dev.qr-mint.net', 'api.qr-mint' ],
	},
	env: {
		customKey: 'env',
	},
};

module.exports = nextConfig;
