import {
	MockedProvider as MockedApolloProvider,
	MockedProviderProps,
} from "@apollo/client/testing";

export const MockedProvider: React.FC<{
	children: React.ReactNode;
	mocks?: MockedProviderProps["mocks"];
}> = ({ children, mocks }) => {
	return (
		<MockedApolloProvider mocks={mocks} addTypename={false}>
			{children}
		</MockedApolloProvider>
	);
};
