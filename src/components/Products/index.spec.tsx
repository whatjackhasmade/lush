import { renderWithTheme } from "../../../.jest/renderWithTheme";
import { Products } from ".";

import { MockedProvider } from "../../../.jest";
import { MockedResponse } from "@apollo/client/testing";
import {
	ProductsDocument,
	ProductsQuery,
	ProductsQueryVariables,
} from "lush/schema";
import { Pagination } from "lush/enums";
import { axe } from "jest-axe";

const mocks: MockedResponse[] = [
	{
		request: {
			query: ProductsDocument,
			variables: {
				channel: "uk",
				first: Pagination.Limit,
				language: "EN",
				filter: {
					isAvailable: true,
					isPublished: true,
					isVisibleInListing: true,
					categories: [],
				},
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
	// TODO: Add more tests
	it("should render correctly", () => {
		const { container } = renderWithTheme(
			<MockedProvider mocks={mocks}>
				<Products />
			</MockedProvider>
		);
		expect(container).not.toBeEmptyDOMElement();
	});

	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(
			<MockedProvider mocks={mocks}>
				<Products />
			</MockedProvider>
		);
		expect(await axe(container)).toHaveNoViolations();
	});
});
