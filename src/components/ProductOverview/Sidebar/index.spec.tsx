import { renderWithTheme } from "../../../../.jest";
import { Sidebar } from ".";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

const mockRenderAddToCart = jest.fn(() => null);

jest.mock("./AddToCart", () => ({
	AddToCart: () => mockRenderAddToCart(),
}));

jest.mock("lush/components", () => ({
	...jest.requireActual("lush/components"),
	Skeleton: () => <div data-testid="skeleton" />,
}));

const props = {
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

describe("Sidebar", () => {
	it("renders skeleton states", () => {
		const { getAllByTestId } = renderWithTheme(<Sidebar loading />);

		expect(getAllByTestId("skeleton")).toHaveLength(5);
	});

	it("calls quantitySet when quantity buttons are clicked", async () => {
		const { getByRole } = renderWithTheme(<Sidebar {...props} />);
		const quantity = getByRole("textbox", { name: "quantity" });
		const decreaseButton = getByRole("button", { name: "quantityDecrease" });
		const increaseButton = getByRole("button", { name: "quantityIncrease" });

		await user.click(decreaseButton);
		expect(quantity).toHaveValue("1");

		await user.click(increaseButton);
		expect(quantity).toHaveValue("2");

		await user.click(increaseButton);
		expect(quantity).toHaveValue("3");

		await user.click(decreaseButton);
		expect(quantity).toHaveValue("2");
	});

	it("increases quantity when quantity input is pressed up on keyboard", async () => {
		const { getByRole } = renderWithTheme(<Sidebar {...props} />);

		const quantityInput = getByRole("textbox", { name: "quantity" });

		await user.click(quantityInput);
		await user.type(quantityInput, "{arrowup}");

		expect(quantityInput).toHaveValue("2");
	});

	it("decreases quantity when quantity input is pressed down on keyboard", async () => {
		const { getByRole } = renderWithTheme(<Sidebar {...props} />);

		const quantityInput = getByRole("textbox", { name: "quantity" });

		await user.click(quantityInput);

		await user.type(quantityInput, "{arrowup}");
		await user.type(quantityInput, "{arrowup}");
		expect(quantityInput).toHaveValue("3");

		await user.type(quantityInput, "{arrowdown}");
		expect(quantityInput).toHaveValue("2");
	});

	it("doesn't change quantity when quantity input is pressed any other key than up/down on keyboard", async () => {
		const { getByRole } = renderWithTheme(<Sidebar {...props} />);
		const quantityInput = getByRole("textbox", { name: "quantity" });

		await user.click(quantityInput);
		await user.type(quantityInput, "a");

		expect(quantityInput).toHaveValue("1");
	});

	it("does not decrease quantity below 1", async () => {
		const { getByRole } = renderWithTheme(<Sidebar {...props} />);
		const quantityInput = getByRole("textbox", { name: "quantity" });
		const decreaseButton = getByRole("button", { name: "quantityDecrease" });

		await user.click(decreaseButton);
		await user.click(decreaseButton);
		await user.click(decreaseButton);

		expect(quantityInput).toHaveValue("1");
	});
});
