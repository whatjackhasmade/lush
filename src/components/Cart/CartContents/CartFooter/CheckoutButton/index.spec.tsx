import { axe } from "jest-axe";
import { renderWithTheme } from "../../../../../../.jest";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutButton } from ".";

// Mock window alert
const mockAlert = jest.fn();
Object.defineProperty(window, "alert", {
	writable: true,
	value: mockAlert,
});

const user = userEvent.setup();

describe("CheckoutButton", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<CheckoutButton />);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("renders the button with the correct text", () => {
		const { getByRole } = renderWithTheme(<CheckoutButton />);
		expect(getByRole("button")).toHaveTextContent("cart.checkout");
	});

	it("disables the button when isEmulatingLoading is true", async () => {
		const { getByRole } = renderWithTheme(<CheckoutButton />);
		const button = getByRole("button");

		await user.click(button);

		expect(button).toBeDisabled();
	});

	it("emulates loading when the button is clicked", async () => {
		const { getByRole } = renderWithTheme(<CheckoutButton />);
		const button = getByRole("button");

		await user.click(button);

		expect(button).toBeDisabled();

		// TODO: Replace with jest fake timers
		await waitFor(() => expect(button).not.toBeDisabled(), {
			timeout: 1500,
		});

		await waitFor(() => {
			expect(mockAlert).toHaveBeenCalledTimes(1);
			expect(mockAlert).toHaveBeenCalledWith(
				"In the real world, this would take you to the checkout page."
			);
		});
	});
});
