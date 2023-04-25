import type { CodegenConfig } from "@graphql-codegen/cli";
import { GraphQL } from "./src/enums/graphql";

const config: CodegenConfig = {
	documents: "src/schema/**/*.graphql",
	generates: {
		"src/schema/index.ts": {
			config: {
				namingConvention: {
					enumValues: "keep",
				},
				withHooks: true,
			},
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-react-apollo",
			],
		},
	},
	schema: GraphQL.URL,
};

export default config;
