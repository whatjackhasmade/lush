import { Config } from "@jest/types";

const config: Config.InitialOptions = {
	clearMocks: true,
	collectCoverage: true,
	moduleNameMapper: {
		"lush/(.*)": "<rootDir>/src/$1",
	},
	roots: ["./src"],
	setupFilesAfterEnv: ["./jest.setup.ts"],
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(t|j)sx?$": [
			"@swc/jest",
			{
				jsc: {
					parser: {
						syntax: "typescript",
						tsx: true,
					},
					target: "es5",
					transform: {
						react: {
							runtime: "automatic",
						},
					},
				},
				module: {
					type: "commonjs",
				},
				swcrc: false,
			},
		],
	},
};

export default config;
