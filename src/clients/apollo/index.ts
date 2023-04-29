import { useMemo } from "react";
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	from,
} from "@apollo/client";
import { deepMerge } from "lush/utils";
import { GraphQL } from "lush/enums";
import { onError } from "@apollo/client/link/error";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

type TApolloClient = ApolloClient<NormalizedCacheObject> | undefined;

let apolloClient: TApolloClient;

const errorLink = onError(() => {});

const httpLink = new HttpLink({
	uri: GraphQL.URL,
});

function initializeApollo(initialState: any = null) {
	const client =
		apolloClient ??
		new ApolloClient({
			ssrMode: typeof window === "undefined",
			link: from([errorLink, httpLink]),
			cache: new InMemoryCache(),
		});

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = client.extract();

		// Merge the initialState from getStaticProps/getServerSideProps in the existing cache
		const data = deepMerge(existingCache, initialState);

		// Restore the cache with the merged data
		client.cache.restore(data);
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === "undefined") return client;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = client;

	return client;
}

export function useApollo(pageProps: any) {
	const state = pageProps[APOLLO_STATE_PROP_NAME];
	const store = useMemo(() => initializeApollo(state), [state]);
	return store;
}
