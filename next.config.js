const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	i18n,
	images: {
		domains: ["unicorn-staging.eu.saleor.cloud"],
	},
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/",
				permanent: true,
			},
		];
	},
	swcMinify: true,
};

module.exports = nextConfig;
