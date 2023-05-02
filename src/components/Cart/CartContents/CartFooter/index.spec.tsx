import { axe } from "jest-axe";
import { renderWithTheme } from "../../../../../.jest";
import { CartFooter } from ".";

const mockCheckoutButton = jest.fn();

jest.mock("./CheckoutButton", () => ({
	CheckoutButton: () => mockCheckoutButton(),
}));

const mockUseCart = jest.fn(() => ({
	costTotal: {
		amount: 10,
		currency: "GBP",
	},
	costTotalRequiredForFreeDelivery: 50,
	hasFreeDelivery: false,
}));

jest.mock("lush/hooks", () => ({
	...jest.requireActual("lush/hooks"),
	useCart: jest.fn(() => mockUseCart()),
}));

describe("CartFooter", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<CartFooter />);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("should render delivery not free", () => {
		const { getByText } = renderWithTheme(<CartFooter />);

		expect(getByText("cart.total")).toBeInTheDocument();
		expect(getByText("cart.deliveryNotFree")).toBeInTheDocument();
		expect(mockCheckoutButton).toHaveBeenCalled();
		expect(mockUseCart).toHaveBeenCalled();
	});

	it("should render free delivery", () => {
		(mockUseCart as jest.Mock).mockImplementationOnce(() => ({
			hasFreeDelivery: true,
			costTotal: {},
		}));

		const { getByText } = renderWithTheme(<CartFooter />);
		expect(getByText("cart.deliveryFree")).toBeInTheDocument();
	});

	it("should render the price if there is a costTotal amount", () => {
		const { getByText } = renderWithTheme(<CartFooter />);
		expect(getByText("£10.00")).toBeInTheDocument();
	});

	it("handles no cost total currency", () => {
		(mockUseCart as jest.Mock).mockImplementationOnce(() => ({
			costTotal: {},
		}));

		const { getByText } = renderWithTheme(<CartFooter />);
		expect(getByText(String.fromCharCode(8211))).toBeInTheDocument();
		expect(getByText("cart.deliveryNotFree")).toBeInTheDocument();
	});
});
