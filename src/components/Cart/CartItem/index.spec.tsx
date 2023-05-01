import React from "react";
import { CartItem, CartItemProps } from ".";
import { renderWithTheme } from "../../../../.jest";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

const mockRemoveFromCart = jest.fn();
const mockQuantitySet = jest.fn();
const mockPulloutSetIsOpen = jest.fn();

jest.mock("lush/hooks", () => ({
	...jest.requireActual("lush/hooks"),
	useCart: jest.fn(() => ({
		quantitySet: mockQuantitySet,
		removeFromCart: mockRemoveFromCart,
		pullout: { setIsOpen: mockPulloutSetIsOpen },
	})),
}));

const props: CartItemProps = {
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
	quantity: 2,
};

describe("CartItem", () => {
	it("renders the product name and category", () => {
		const { getByText } = renderWithTheme(<CartItem {...props} />);
		expect(getByText("Test Product")).toBeInTheDocument();
		expect(getByText("Test Category")).toBeInTheDocument();
	});

	it("calls removeFromCart when remove button is clicked", async () => {
		const { getByRole } = renderWithTheme(<CartItem {...props} />);
		const removeButton = getByRole("button", { name: "remove" });
		await user.click(removeButton);
		expect(mockRemoveFromCart).toHaveBeenCalledWith(props.product.id);
	});

	it("calls quantitySet when quantity buttons are clicked", async () => {
		const { getByRole } = renderWithTheme(<CartItem {...props} />);
		const decreaseButton = getByRole("button", { name: "quantityDecrease" });
		const increaseButton = getByRole("button", { name: "quantityIncrease" });

		await user.click(decreaseButton);

		expect(mockQuantitySet).toHaveBeenCalledWith({
			productId: props.product.id,
			quantity: props.quantity - 1,
		});

		await user.click(increaseButton);

		expect(mockQuantitySet).toHaveBeenCalledWith({
			productId: props.product.id,
			quantity: props.quantity + 1,
		});
	});

	it("increases quantity when quantity input is pressed up on keyboard", async () => {
		const { getByRole } = renderWithTheme(<CartItem {...props} />);

		const quantityInput = getByRole("textbox", { name: "quantity" });

		await user.click(quantityInput);
		await user.type(quantityInput, "{arrowup}");

		expect(mockQuantitySet).toHaveBeenCalledWith({
			productId: props.product.id,
			quantity: props.quantity + 1,
		});
	});

	it("decreases quantity when quantity input is pressed down on keyboard", async () => {
		const { getByRole } = renderWithTheme(<CartItem {...props} quantity={2} />);

		const quantityInput = getByRole("textbox", { name: "quantity" });

		await user.click(quantityInput);
		await user.type(quantityInput, "{arrowdown}");

		expect(mockQuantitySet).toHaveBeenCalledWith({
			productId: props.product.id,
			quantity: props.quantity - 1,
		});
	});

	it("doesn't change quantity when quantity input is pressed any other key than up/down on keyboard", async () => {
		const { getByRole } = renderWithTheme(<CartItem {...props} />);
		const quantityInput = getByRole("textbox", { name: "quantity" });

		await user.click(quantityInput);
		await user.type(quantityInput, "a");
	});

	it("displays the product price", () => {
		const { getByText } = renderWithTheme(<CartItem {...props} />);
		expect(getByText("£10.00")).toBeInTheDocument();
	});

	it("displays in stock availability", () => {
		const { getByText } = renderWithTheme(<CartItem {...props} />);
		expect(getByText("cart.inStock")).toBeInTheDocument();
	});

	it("shows em dash when product gross is not provided", () => {
		const { getByText } = renderWithTheme(
			<CartItem
				{...props}
				product={{
					...props.product,
					pricing: undefined,
				}}
			/>
		);

		expect(getByText(String.fromCharCode(8211))).toBeInTheDocument();
	});

	// TODO: Fix
	it.skip("calls pullout.setIsOpen when the product name is clicked", async () => {
		const { getByRole } = renderWithTheme(<CartItem {...props} />);
		const productLink = getByRole("link", {
			name: "Test Product",
		});

		await user.click(productLink);

		expect(mockPulloutSetIsOpen).toHaveBeenCalledWith(true);
	});
});
