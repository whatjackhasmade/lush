import { renderWithTheme } from "../../../../../.jest";
import { AddToCart } from ".";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { axe } from "jest-axe";

const user = userEvent.setup();

const mockSetQuantity = jest.fn(() => {});

jest.mock("lush/components", () => ({
	...jest.requireActual("lush/components"),
	Skeleton: () => <div data-testid="skeleton" />,
}));

const props = {
	setQuantity: mockSetQuantity,
	quantity: 1,
	product: {
		attributes: [],
		metadata: [],
		slug: "test-product",
		created: "2021-01-01T00:00:00.000Z",
		updatedAt: "2021-01-01T00:00:00.000Z",
		productType: {
			id: "123",
			slug: "test-product-type",
		},
		id: "123",
		name: "Test Product",
		category: {
			id: "1234",
			slug: "test-category",
			name: "Test Category",
		},
		isAvailableForPurchase: true,
		pricing: {
			priceRange: {
				stop: {
					gross: {
						amount: 10,
						currency: "GBP",
					},
					currency: "GBP",
					net: {
						amount: 10,
						currency: "GBP",
					},
					tax: {
						amount: 0,
						currency: "GBP",
					},
				},
			},
		},
	},
	loading: false,
};

describe("AddToCart", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<AddToCart {...props} />);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("shows added to cart message when clicked", async () => {
		const { getByRole } = renderWithTheme(<AddToCart {...props} />);

		const addToCartButton = getByRole("button", { name: /addToBag/i });
		expect(addToCartButton).toBeInTheDocument();

		await user.click(addToCartButton);

		expect(mockSetQuantity).toHaveBeenCalledTimes(1);
		expect(mockSetQuantity).toHaveBeenCalledWith(1);

		expect(addToCartButton).toHaveTextContent("added");
		expect(addToCartButton).toBeDisabled();

		waitFor(() => {
			expect(addToCartButton).not.toHaveTextContent("added");
			expect(addToCartButton).not.toBeDisabled();
		});
	});

	it("does not call setQuantity when product is falsey", async () => {
		const { getByRole } = renderWithTheme(
			<AddToCart {...props} product={undefined} />
		);

		const addToCartButton = getByRole("button", { name: /addToBag/i });
		expect(addToCartButton).toBeInTheDocument();

		await user.click(addToCartButton);

		expect(mockSetQuantity).toHaveBeenCalledTimes(0);
	});

	it("is disabled if loading", () => {
		const { getByRole } = renderWithTheme(
			<AddToCart {...props} loading={true} />
		);

		const addToCartButton = getByRole("button", { name: /addToBag/i });
		expect(addToCartButton).toBeInTheDocument();
		expect(addToCartButton).toBeDisabled();
	});

	it("is disabled if no gross", () => {
		const { getByRole } = renderWithTheme(
			<AddToCart {...props} product={undefined} />
		);

		const addToCartButton = getByRole("button", { name: /addToBag/i });
		expect(addToCartButton).toBeInTheDocument();
		expect(addToCartButton).toBeDisabled();
	});
});
