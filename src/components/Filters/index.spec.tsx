import { MockedProvider, renderWithTheme } from "../../../.jest";
import userEvent from "@testing-library/user-event";
import { Filters } from ".";
import { wait } from "lush/utils";

import { MockedResponse } from "@apollo/client/testing";
import {
	CategoriesDocument,
	CategoriesQuery,
	CategoriesQueryVariables,
} from "lush/schema";
import { act } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { useFilters } from "lush/hooks";
import { axe } from "jest-axe";

const user = userEvent.setup();

const mockToggleCategory = jest.fn();

jest.mock("lush/hooks/useFilters", () => ({
	useFilters: jest.fn(() => ({
		activeCategories: [],
		toggleCategory: mockToggleCategory,
	})),
}));

jest.mock("lush/components/Skeleton", () => ({
	Skeleton: () => <div data-testid="skeleton" />,
}));

const mocks: MockedResponse[] = [
	{
		request: {
			query: CategoriesDocument,
			variables: {
				first: 100,
			} as CategoriesQueryVariables,
		},
		result: {
			data: {
				categories: {
					edges: [
						{
							cursor: "1",
							node: {
								description: "foo-description",
								id: "1",
								name: "foo",
								slug: "foo-slug",
								__typename: "Category",
							},
						},
						{
							cursor: "2",
							node: {
								id: "2",
								description: "bar-description",
								name: "bar",
								slug: "bar-slug",
								__typename: "Category",
							},
						},
					],
				},
			} as CategoriesQuery,
		},
	},
];

describe("Filters", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(
			<MockedProvider mocks={mocks}>
				<Filters />
			</MockedProvider>
		);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("should render categories", async () => {
		const { queryAllByTestId, getAllByTestId, getByRole, getByLabelText } =
			renderWithTheme(
				<MockedProvider mocks={mocks}>
					<Filters />
				</MockedProvider>
			);

		expect(
			getByRole("heading", {
				name: "filters.title",
			})
		).toBeInTheDocument();

		expect(getAllByTestId("skeleton")).toHaveLength(36);

		await act(wait);

		expect(queryAllByTestId("skeleton")).toHaveLength(0);

		const categoryFoo = getByLabelText("foo");
		expect(categoryFoo).toBeInTheDocument();

		const categoryBar = getByLabelText("bar");
		expect(categoryBar).toBeInTheDocument();
	});

	it("should render error", async () => {
		const { queryAllByTestId, getAllByTestId, getByText } = renderWithTheme(
			<MockedProvider
				mocks={[
					{
						request: {
							query: CategoriesDocument,
							variables: {
								first: 100,
							} as CategoriesQueryVariables,
						},
						error: new GraphQLError("error"),
					},
				]}
			>
				<Filters />
			</MockedProvider>
		);

		expect(getAllByTestId("skeleton")).toHaveLength(36);

		await act(wait);

		expect(queryAllByTestId("skeleton")).toHaveLength(0);

		expect(getByText("error.generic")).toBeInTheDocument();
	});

	it("handles no categories", async () => {
		const { getByText, queryAllByTestId, getAllByTestId, getByRole } =
			renderWithTheme(
				<MockedProvider
					mocks={[
						{
							request: {
								query: CategoriesDocument,
								variables: {
									first: 100,
								} as CategoriesQueryVariables,
							},
							result: {
								data: {
									categories: {
										edges: [],
									},
								},
							},
						},
					]}
				>
					<Filters />
				</MockedProvider>
			);

		expect(getAllByTestId("skeleton")).toHaveLength(36);

		await act(wait);

		expect(queryAllByTestId("skeleton")).toHaveLength(0);

		expect(
			getByRole("heading", {
				name: "filters.title",
			})
		).toBeInTheDocument();

		expect(getByText("error.noCategories")).toBeInTheDocument();
	});

	it("toggles category", async () => {
		const { getByText, getByLabelText, queryAllByTestId, getAllByTestId } =
			renderWithTheme(
				<MockedProvider mocks={mocks}>
					<Filters />
				</MockedProvider>
			);

		expect(getAllByTestId("skeleton")).toHaveLength(36);

		await act(wait);

		expect(queryAllByTestId("skeleton")).toHaveLength(0);

		const categoryLabelFoo = getByText("foo");
		const categoryInputFoo = getByLabelText("foo");

		expect(categoryLabelFoo).toBeInTheDocument();
		expect(categoryInputFoo).toBeInTheDocument();

		await user.click(categoryLabelFoo);

		expect(mockToggleCategory).toHaveBeenCalledWith({
			description: "foo-description",
			id: "1",
			name: "foo",
			slug: "foo-slug",
		});
	});

	it("shows active categories", async () => {
		(useFilters as jest.Mock).mockImplementation(() => ({
			activeCategories: [
				{
					description: "foo-description",
					id: "1",
					name: "foo",
					slug: "foo-slug",
				},
			],
			toggleCategory: mockToggleCategory,
		}));

		const { getByLabelText, queryAllByTestId, getAllByTestId } =
			renderWithTheme(
				<MockedProvider mocks={mocks}>
					<Filters />
				</MockedProvider>
			);

		expect(getAllByTestId("skeleton")).toHaveLength(36);

		await act(wait);

		expect(queryAllByTestId("skeleton")).toHaveLength(0);

		const categoryInputFoo = getByLabelText("foo");
		expect(categoryInputFoo).toBeInTheDocument();
		expect(categoryInputFoo).toBeChecked();

		const categoryInputBar = getByLabelText("bar");
		expect(categoryInputBar).toBeInTheDocument();
		expect(categoryInputBar).not.toBeChecked();
	});
});
