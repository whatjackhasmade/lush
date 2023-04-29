import { renderWithTheme } from "../../../.jest";
import { Cart } from ".";

const mockRenderCartContents = jest.fn();

jest.mock("./CartContents", () => ({
	CartContents: () => mockRenderCartContents(),
}));

const mockUseLockBodyScroll = jest.fn();
const mockSetIsOpen = jest.fn();

const mockUseCart = jest.fn(() => ({
	pullout: {
		setIsOpen: mockSetIsOpen,
	},
}));

jest.mock("lush/hooks", () => ({
	...jest.requireActual("lush/hooks"),
	useLockBodyScroll: jest.fn(() => mockUseLockBodyScroll()),
	useCart: jest.fn(() => mockUseCart()),
}));

describe("Cart", () => {
	it("should lock body scroll", () => {
		renderWithTheme(<Cart />);
		expect(mockUseLockBodyScroll).toHaveBeenCalled();
	});

	it("should render the cart contents", () => {
		renderWithTheme(<Cart />);
		expect(mockRenderCartContents).toHaveBeenCalled();
	});

	it("should close the cart when the escape key is pressed", async () => {
		renderWithTheme(<Cart />);

		// Trigger window event listeners keydown
		const event = new KeyboardEvent("keydown", { key: "Escape" });
		window.dispatchEvent(event);

		expect(mockSetIsOpen).toHaveBeenCalledWith(false);
	});
});
