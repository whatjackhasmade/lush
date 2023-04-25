import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import { GraphQL } from "lush/enums/graphql";

const isServer = typeof window === "undefined";
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

let client: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = () =>
	new ApolloClient({
		uri: GraphQL.URL,
		cache: new InMemoryCache().restore(windowApolloState || {}),
	});

export const getApolloClient = (createNew = false) => {
	if (createNew) return createApolloClient();
	return client ?? createApolloClient();
};
