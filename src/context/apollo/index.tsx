import { ApolloProvider as Provider } from "@apollo/client";
import { FC, PropsWithChildren } from "react";

import { getApolloClient } from "../../clients/apollo";

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
	const client = getApolloClient();
	return <Provider client={client}>{children}</Provider>;
};
