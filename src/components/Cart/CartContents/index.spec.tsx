import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../../.jest";
import { CartContents } from ".";

const mockRenderCartItem = jest.fn();
const mockRenderCartFooter = jest.fn();

jest.mock("../CartItem", () => ({
	CartItem: (props: any) => mockRenderCartItem(props),
}));

jest.mock("./CartFooter", () => ({
	CartFooter: () => mockRenderCartFooter(),
}));

const mockSetIsOpen = jest.fn();

const cartItem = {
	quantity: 1,
	product: {
		id: "1",
		name: "Product 1",
		price: 100,
		slug: "product-1",
		thumbnail: {
			url: "https://via.placeholder.com/150",
		},
	},
};

const mockUseCart = jest.fn(() => ({
	cart: [cartItem],
	count: 1,
	pullout: {
		setIsOpen: mockSetIsOpen,
	},
}));

jest.mock("lush/hooks", () => ({
	...jest.requireActual("lush/hooks"),
	useCart: jest.fn(() => mockUseCart()),
	useOnClickOutside: jest.fn(),
}));

describe("CartContents", () => {
	it("should init useOnClickOutside", () => {
		renderWithTheme(<CartContents />);
		expect(mockUseCart).toHaveBeenCalledTimes(1);
	});

	it("should call useCart pullout.close method when close button is clicked", async () => {
		const { getByRole } = renderWithTheme(<CartContents />);

		const button = getByRole("button", { name: "cart.close" });
		await userEvent.click(button);

		expect(mockSetIsOpen).toHaveBeenCalledTimes(1);
		expect(mockSetIsOpen).toHaveBeenCalledWith(false);
	});

	it("should lock focus inside the cart contents", async () => {
		const { getByRole } = renderWithTheme(
			<>
				<button id="first" type="button">
					Button first
				</button>
				<CartContents />
				<button id="last" type="button">
					Button last
				</button>
			</>
		);

		const onlyFocusableElement = getByRole("button", { name: "cart.close" });

		expect(document.activeElement).toEqual(onlyFocusableElement);

		await userEvent.tab();
		expect(document.activeElement).toEqual(onlyFocusableElement);

		await userEvent.tab({ shift: true });
		expect(document.activeElement).toEqual(onlyFocusableElement);
	});

	it("should render the cart items", () => {
		renderWithTheme(<CartContents />);
		expect(mockRenderCartItem).toHaveBeenCalledTimes(1);
		expect(mockRenderCartItem).toHaveBeenCalledWith(cartItem);
	});

	it("should render the cart footer", () => {
		renderWithTheme(<CartContents />);
		expect(mockRenderCartFooter).toHaveBeenCalled();
	});

	it("should show the empty cart message when there are no items in the cart", () => {
		mockUseCart.mockImplementationOnce(() => ({
			cart: [],
			count: 0,
			pullout: {
				setIsOpen: mockSetIsOpen,
			},
		}));

		const { getByText } = renderWithTheme(<CartContents />);
		expect(getByText("cart.empty.title")).toBeInTheDocument();
		expect(getByText("cart.empty.body")).toBeInTheDocument();
	});
});
