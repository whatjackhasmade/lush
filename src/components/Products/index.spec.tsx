import { renderWithTheme } from "../../../.jest/renderWithTheme";
import { Products } from ".";

import { MockedProvider } from "../../../.jest";
import { MockedResponse } from "@apollo/client/testing";
import {
	ProductsDocument,
	ProductsQuery,
	ProductsQueryVariables,
} from "lush/schema";

const mocks: MockedResponse[] = [
	{
		request: {
			query: ProductsDocument,
			variables: {
				channel: "uk",
				first: 100,
			} as ProductsQueryVariables,
		},
		result: {
			data: {
				products: {
					edges: [
						{
							node: {
								id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzEwMjU3NjU3NjU3NjU=",
								name: "Lush",
							},
						},
					],
				},
			} as ProductsQuery,
		},
	},
];

describe("Products", () => {
	it("should render correctly", () => {
		const { container } = renderWithTheme(
			<MockedProvider mocks={mocks}>
				<Products />
			</MockedProvider>
		);
		expect(container).not.toBeEmptyDOMElement();
	});
});
