import userEvent from "@testing-library/user-event";
import { CartToggle } from ".";
import { renderWithTheme } from "../../../../.jest";

import { useCart } from "lush/hooks/useCart";
import { axe } from "jest-axe";

const user = userEvent.setup();

const mockSetIsOpen = jest.fn();

jest.mock("lush/hooks/useCart", () => ({
	useCart: jest.fn(() => ({
		count: 0,
		pullout: {
			isOpen: false,
			setIsOpen: mockSetIsOpen,
		},
	})),
}));

describe("CartToggle", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<CartToggle />);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("should render cart toggle", () => {
		const { getByRole } = renderWithTheme(<CartToggle />);

		expect(getByRole("switch")).toBeInTheDocument();
	});

	it("should give toggle aria-checked value 'false' when pullout is closed", async () => {
		const { getByRole } = renderWithTheme(<CartToggle />);

		const toggle = getByRole("switch");
		expect(toggle).toHaveAttribute("aria-checked", "false");
	});

	it("should give toggle aria-checked value 'true' when pullout is open", async () => {
		(useCart as jest.Mock).mockReturnValueOnce({
			count: 0,
			pullout: {
				isOpen: true,
				setIsOpen: mockSetIsOpen,
			},
		});

		const { getByRole } = renderWithTheme(<CartToggle />);

		const toggle = getByRole("switch");
		expect(toggle).toHaveAttribute("aria-checked", "true");
	});

	it("should call setIsOpen when clicked", async () => {
		const { getByRole } = renderWithTheme(<CartToggle />);

		const toggle = getByRole("switch");
		await user.click(toggle);

		expect(mockSetIsOpen).toHaveBeenCalledTimes(1);
	});

	it("should show count when count is greater than 0", async () => {
		(useCart as jest.Mock).mockReturnValueOnce({
			count: 1,
			pullout: {
				isOpen: false,
				setIsOpen: mockSetIsOpen,
			},
		});

		const { getByText } = renderWithTheme(<CartToggle />);

		expect(getByText("1")).toBeInTheDocument();
	});

	it("should not show count when count is 0", async () => {
		(useCart as jest.Mock).mockReturnValueOnce({
			count: 0,
			pullout: {
				isOpen: false,
				setIsOpen: mockSetIsOpen,
			},
		});

		const { queryByText } = renderWithTheme(<CartToggle />);

		expect(queryByText("0")).not.toBeInTheDocument();
	});
});
