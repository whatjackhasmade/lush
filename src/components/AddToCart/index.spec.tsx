import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../.jest";
import { useCart } from "lush/hooks";

import { AddToCart } from ".";

const mockRenderSkeleton = jest.fn(() => null);

jest.mock("lush/components", () => ({
	...jest.requireActual("lush/components"),
	Skeleton: () => mockRenderSkeleton(),
}));

const mockAddToCart = jest.fn();

jest.mock("lush/hooks", () => ({
	...jest.requireActual("lush/hooks"),
	useCart: jest.fn(() => ({
		addToCart: mockAddToCart,
		cart: [],
	})),
}));

describe("AddToCart", () => {
	const props = {
		loading: false,
		product: {
			id: "1",
			created: "2021-01-01T00:00:00.000Z",
			updatedAt: "2021-02-01T00:00:00.000Z",
			metadata: [],
			name: "Test product",
			slug: "test-product",
			productType: {
				id: "1",
				slug: "test-product-type",
			},
			pricing: {
				priceRangeUndiscounted: {
					stop: {
						gross: {
							amount: 100,
							currency: "GBP",
						},
						net: {
							amount: 100,
							currency: "GBP",
						},
						tax: {
							amount: 0,
							currency: "GBP",
						},
						currency: "GBP",
					},
				},
			},
		},
	};

	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<AddToCart {...props} />);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("should render a skeleton when loading", () => {
		renderWithTheme(<AddToCart {...props} loading />);
		expect(mockRenderSkeleton).toHaveBeenCalled();
	});

	it("adds product to cart when button is not disabled and clicked", async () => {
		const { getByRole } = renderWithTheme(<AddToCart {...props} />);
		const button = getByRole("button");

		await userEvent.click(button);

		expect(mockAddToCart).toHaveBeenCalledWith(props.product);
	});

	it("shows add to cart text when product is not in cart", () => {
		const { getByRole } = renderWithTheme(<AddToCart {...props} />);

		const button = getByRole("button");
		expect(button).toHaveTextContent("addToCart");
	});

	it("shows add another to cart text when product is in cart", () => {
		(useCart as jest.Mock).mockReturnValueOnce({
			addToCart: mockAddToCart,
			cart: [{ product: { id: "2" } }],
		});

		const { getByRole } = renderWithTheme(
			<AddToCart {...props} product={{ ...props.product, id: "2" }} />
		);

		const button = getByRole("button");
		expect(button).toHaveTextContent("addAnotherToCart");
	});

	it("shows unavailable text when product has no price", () => {
		const { getByRole } = renderWithTheme(
			<AddToCart {...props} product={{ ...props.product, pricing: null }} />
		);

		const button = getByRole("button");
		expect(button).toHaveTextContent("unavailable");
	});
});
