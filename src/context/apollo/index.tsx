import { ApolloProvider as Provider } from "@apollo/client";
import { FC, PropsWithChildren } from "react";

import { useApollo } from "../../clients/apollo";

interface ApolloProviderProps {
	pageProps: any;
}

export const ApolloProvider: FC<PropsWithChildren<ApolloProviderProps>> = ({
	children,
	pageProps,
}) => {
	const client = useApollo(pageProps);
	return <Provider client={client}>{children}</Provider>;
};
